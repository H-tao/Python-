from django.conf.urls import url
from apps.goods import views

urlpatterns = [
    url(r'^$', views.index, name='index'),  # 首页
]