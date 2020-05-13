from django.shortcuts import render

# Create your views here.

from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from DB.MysqlClient import MysqlClient
from Utils import positions
import math
from copy import deepcopy
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(message)s",
    datefmt="[%Y/%m/%d %X]",
    filename='./log.txt'
)

mysql_client = MysqlClient()

# 查询首页
def index_handler(request):
    response = render(request, "index.html")
    log_info = f'{request.META["REMOTE_ADDR"]} "{request.META["PATH_INFO"]}/{request.META["QUERY_STRING"]} {request.META["SERVER_PROTOCOL"]}" {request.method} {response.status_code} '
    logger.info(log_info)
    return response

# 处理查询请求
def jobs_handler(request):
    context = get_content(request)
    keyword = request.GET.get("keyword") if request.GET.get("keyword") else ""
    num = int(request.GET.get('num')) if request.GET.get("num") else ""
    data_count = mysql_client.get_total_num(keyword)
    context['job_num'] = data_count

    db_table = positions.keyword_to_db_table()
    name = db_table[keyword] if db_table[keyword] else None
    if name is not None:
        db_name = name['DB_NAME']
        table_name = name['TABLE_NAME']
        context['d'] = db_name
        context['t'] = table_name

    try:
        context["total_page_num"] = math.ceil(int(data_count) / int(num))
    except:
        data_count = 0
    response = render(request, "jobs.html", context)
    log_info = f'{request.META["REMOTE_ADDR"]} "{request.META["PATH_INFO"]}/{request.META["QUERY_STRING"]} {request.META["SERVER_PROTOCOL"]}" {request.method} {response.status_code} '
    logger.info(log_info)
    return response

# 处理Ajax请求
def query_handler(request):
    context = get_content(request)
    response = JsonResponse(context)
    log_info = f'{request.META["REMOTE_ADDR"]} "{request.META["PATH_INFO"]}/{request.META["QUERY_STRING"]} {request.META["SERVER_PROTOCOL"]}" {request.method} {response.status_code} '
    logger.info(log_info)
    return response

# 详情页请求
def detail_handler(request):
    return None


def get_content(request):
    keyword = request.GET.get("keyword") if request.GET.get("keyword") else ""
    page = int(request.GET.get('page')) if request.GET.get("page") else ""
    num = int(request.GET.get('num')) if request.GET.get("num") else ""
    # 从后台获取数据
    df = mysql_client.get_jobs(keyword, page, num)
    if df is None:
        data = {}
    else:
        data = df.to_dict()
    # print(data)
    # 构建数据传给前端
    context = {}
    context["num"] = num
    context['job_list'] = data
    context['keyword'] = keyword
    context['page'] = page
    return context

