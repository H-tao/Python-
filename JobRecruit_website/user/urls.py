from django.urls import path, re_path
from . import views
from django.conf.urls import url

urlpatterns = [
    path('', views.index_handler, name='index'),
    path('jobs', views.jobs_handler, name='jobs'),
    path('query', views.query_handler, name='query'),
    path('detail', views.detail_handler, name='detail'),

    url(r'^register$', views.RegisterView.as_view(), name='register'),  # 注册
    url(r'^active/(.*)$', views.ActiveView.as_view(), name='active'), # 用户激活

    url(r'^login$', views.LoginView.as_view(), name='login'), # 登录
    url(r'^logout$', views.LogoutView.as_view(), name='logout'), # 登出
]