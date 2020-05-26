from celery import Celery
from django.conf import settings
from django.core.mail import send_mail
import time

# 任务处理者添加此段代码
# import os
# import django
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'dailyfresh.settings')
# django.setup()

# 创建一个Celery类的实例对象, broker指定中间人为redis
app = Celery("celery_tasks.tasks", broker="redis://127.0.0.1:6379/8")

@app.task
def send_register_active_email(to_email, username, token):
    '''发送激活邮件'''
    # 组织邮件信息
    subject = '天天生鲜欢迎信息'    # 邮件主题
    message = ''
    sender = settings.EMAIL_FROM
    receiver = [to_email]
    html_message = f'<h1>{username}，欢迎您成为天天生鲜注册会员</h1>请点击下面链接激活您的账户<br/><a href="http://127.0.0.1:80/user/active/{token}">http://127.0.0.1:80/user/active/{token}</a>'        # 邮件正文

    send_mail(subject, message, sender, receiver, html_message=html_message)
    time.sleep(5)
