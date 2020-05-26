from django.shortcuts import render, redirect, reverse
from django.views import View
from django.http import HttpResponse
import re
# from django.contrib.auth.models import User # 已经替换成自己的User
from apps.user.models import User, Address
from apps.goods.models import GoodsSKU
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from itsdangerous import SignatureExpired
from django.conf import settings
from celery_tasks.tasks import send_register_active_email
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django_redis import get_redis_connection

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
    return redirect(reverse('goods:index'))

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
                next_url = request.GET.get('next', reverse('goods:index'))  # 获取不到next时，转到首页


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
        return redirect(reverse('goods:index'))



# /user
class UserInfoView(LoginRequiredMixin, View):
    '''用户中心——信息页'''
    def get(self, request):
        # 获取用户的个人信息
        user = request.user
        address = Address.objects.get_default_address(user)

        # 获取用户的历史浏览记录
        conn = get_redis_connection('default')

        history_key = 'history_%d' % user.id

        # 获取用户最新浏览的5个商品的id
        sku_ids = conn.lrange(history_key, 0, 4)

        # 从数据库中查询用户浏览的商品的具体信息
        goods_list = []
        for id in sku_ids:
            goods = GoodsSKU.objects.get(id=id)
            goods_list.append(goods)

        # goods_list = GoodsSKU.objects.filter(id__in=sku_ids)
        #
        # goods_res = []
        # for id in sku_ids
        #     for goods in goods_list:
        #         if id == goods.id:
        #             goods_res.append(goods)

        context = {
            'page':'user',
            'address':address,
            'goods_li':goods_list
        }



        return render(request, 'user_center_info.html', context)

# /user/order
class UserOrderView(LoginRequiredMixin, View):
    '''用户中心——订单页'''
    def get(self, request):
        # 获取用户的订单信息

        return render(request, 'user_center_order.html', {'page':'order'})

# /user/address
class AddressView(LoginRequiredMixin, View):
    '''用户中心——地址页'''
    def get(self, request):
        # 获取登录用户对应的User对象
        user = request.user
        # 获取用户的默认收货地址
        address = Address.objects.get_default_address(user)

        # 返回
        return render(request, 'user_center_site.html', {'page':'address', 'address':address})

    def post(self, request):
        '''地址的添加'''
        # 接收数据
        receiver = request.POST.get('receiver')
        addr = request.POST.get('addr')
        zip_code = request.POST.get('zip_code')
        phone = request.POST.get('phone')

        # 校验数据
        if not all([receiver, addr, phone]):
            return render(request, 'user_center_site.html', {'errmsg': '数据不完整'})

        # 校验手机号
        if not re.match(r'^1[3|4|5|7|8][0-9]{9}$', phone):
            return render(request, 'user_center_site.html', {'errmsg': '手机格式不正确'})

        # 业务处理：存储地址
        # 如果用户已经有默认收货地址，添加的地址不作为默认收货地址，否则作为默认收货地址
        user = request.user
        # 查询收货地址
        address = Address.objects.get_default_address(user=user)

        if address:
            is_default = False
        else:
            is_default = True

        # 添加地址
        Address.objects.create(user=user, receiver=receiver, addr=addr, zip_code=zip_code, phone=phone, is_default=is_default)

        # 返回应答，刷新地址页面
        return redirect(reverse('user:address'))    # get请求




