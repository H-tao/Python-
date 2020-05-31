from functools import wraps
import logging

logger = logging.getLogger(__name__)
logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s %(message)s",
    datefmt="[%Y/%m/%d %X]",
    filename='./log.txt'
)

def logit():
    '''
    日志装饰器，记录访问请求的部分参数和返回响应的状态码
    :return:
    '''
    def logging_decorator(func):
        @wraps(func)
        def wrapped_function(*args, **kwargs):
            request = args[0]
            response = func(*args, **kwargs)
            log_info = f'{request.META["REMOTE_ADDR"]} "{request.META["PATH_INFO"]}/{request.META["QUERY_STRING"]} {request.META["SERVER_PROTOCOL"]}" {request.method} {response.status_code} '
            logger.info(log_info)
            return response
        return wrapped_function
    return logging_decorator