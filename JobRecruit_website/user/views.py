from django.http import JsonResponse
from copy import deepcopy

from django.shortcuts import render, redirect, reverse, HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django_redis import get_redis_connection
from django.views import View
# from django.contrib.auth.models import User # 已经替换成自己的User
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired
from django.conf import settings
from user.models import User
from celery_tasks.tasks import send_register_active_email
from Log.logging import logit
from DB.MysqlClient import MysqlClient
from Utils import positions
import math, re

mysql_client = MysqlClient()


@logit()
def index_handler(request):
    '''首页'''
    return render(request, "index.html")

@logit()
def jobs_handler(request):
    '''查询请求'''
    context = get_content(request)
    keyword = request.GET.get("keyword")
    num = int(request.GET.get('num'))

    db_table = positions.keyword_to_db_table()
    name = db_table[keyword] if db_table[keyword] else None
    if name is not None:
        context['d'] = name['DB_NAME']
        context['t'] = name['TABLE_NAME']

    data_count = mysql_client.get_total_num(keyword)
    context['job_num'] = data_count
    try:
        context["total_page_num"] = math.ceil(int(data_count) / int(num))
    except:
        data_count = 0
    return render(request, "jobs.html", context)

@logit()
def query_handler(request):
    '''处理Ajax请求'''
    context = get_content(request)
    return JsonResponse(context)


def detail_handler(request):
    '''岗位详情页'''
    return None


def get_content(request):
    '''获取数据'''
    keyword = request.GET.get("keyword")
    page = int(request.GET.get('page'))
    num = int(request.GET.get('num'))
    # 从后台获取数据
    df = mysql_client.get_jobs(keyword, page, num)
    data = df.to_dict() if df is not None else {}
    # 构建数据传给前端
    return {"num":num, "job_list":data, "keyword":keyword, "page":page}


def register(request):
    if request.method == 'GET':
        '''显示注册页面'''
        return render(request, 'register.html')
    else:
        return register_handle(request)

def register_handle(request):
    '''注册处理'''
    # 接收数据
    username = request.POST.get('user_name')
    password = request.POST.get('pwd')
    email = request.POST.get('email')
    allow = request.POST.get('allow')


    # 进行数据校验，all判断所有内容，有一个内容为空，返回False
    if not all([username, password, email]):
        # 数据不完整，返回注册页
        return render(request, 'register.html', {'errmsg': '数据不完整'})

    # 校验用户名是否存在
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        # 用户名不存在
        user = None

    # 用户名已经存在
    if user:
        return render(request, 'register.html', {'errmsg': '用户名已存在'})


    # 校验邮箱
    if not re.match(r'^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$', email):
        return render(request, 'register.html', {'errmsg': '邮箱格式不正确'})

    # 校验是否同意协议
    if allow != 'on':
        return render(request, 'register.html', {'errmsg': '请同意协议'})

    # 进行业务处理：用户注册
    user = User.objects.create_user(username,  email, password)
    user.is_active = 0
    user.save()

    # 发送激活邮件，包含激活链接
    # 激活链接中需要包含用户的身份信息，并且要把身份信息进行加密
    # 加密用户的身份信息，生成激活token
    serializer = Serializer(settings.SECRET_KEY, 3600)
    info = {'confirm':user.id}
    token = serializer.dumps(info).decode()

    # 发邮件
    send_register_active_email.delay(email, username, token)

    # 注册成功，跳转首页
    return redirect(reverse('user:index'))

class RegisterView(View):
    def get(self, request):
        '''显示注册页面'''
        return render(request, 'register.html')

    def post(self, request):
        return register_handle(request)

class ActiveView(View):
    '''用户激活'''
    def get(self, request, token):
        '''进行用户激活'''
        # 解密信息
        serializer = Serializer(settings.SECRET_KEY, 3600)
        try:
            info = serializer.loads(token)
            user_id = info['confirm']

            # 根据用户id获取用户信息并激活
            user = User.objects.get(id=user_id)
            user.is_active = 1
            user.save()

            # 跳转到登录页面
            return redirect(reverse('user:login'))
        except SignatureExpired as e:
            # 激活链接已经过期，实际项目需要重发链接
            return HttpResponse('激活链接已过期')


# /user/login
class LoginView(View):
    '''登录'''
    def get(self, request):
        '''登录页面'''
        if 'username' in request.COOKIES:
            username = request.COOKIES.get('username')
            checked = 'checked'
        else:
            username = ''
            checked = ''
        content = {'username':username, 'checked': checked}
        return render(request, 'login.html', content)

    def post(self, request):
        '''登录校验'''
        # 接收数据
        username = request.POST.get('username')
        password = request.POST.get('pwd')

        # 校验数据
        # 进行数据校验，all判断所有内容，有一个内容为空，返回False
        if not all([username, password]):
            # 数据不完整，返回注册页
            return render(request, 'login.html', {'errmsg': '数据不完整'})

        # 业务处理：登录校验
        user = authenticate(username=username, password=password)
        if user is not None:
            # 用户名或密码正确
            if user.is_active:
                # 用户已激活，记录登录状态
                login(request, user)

                # 获取登录后所要跳转到的地址
                next_url = request.GET.get('next', reverse('user:index'))  # 获取不到next时，转到首页


                # 跳转到首页
                response = redirect(next_url)

                # 判断是否需要记住用户名
                remember = request.POST.get('remenber')
                # 记住用户名
                if remember == 'on':
                    response.set_cookie('username', username, max_age=7*24*3600)
                else:
                    response.delete_cookie('username')

                # 返回响应
                return response
            else:
                # 用户未激活
                return render(request, 'login.html', {'errmsg': '用户名未激活'})
        else:
            # 用户名或密码错误
            return render(request, 'login.html', {'errmsg': '用户名或密码错误'})


# /user/logout
class LogoutView(View):
    '''退出登录'''
    def get(self, request):
        '''退出登录'''
        # 清除用户的session信息
        logout(request)

        # 跳转到首页
        return redirect(reverse('user:index'))