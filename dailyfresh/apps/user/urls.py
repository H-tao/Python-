from django.conf.urls import url
from apps.user import views

urlpatterns = [
    url(r'^register$', views.RegisterView.as_view(), name='register'),  # 注册
    url(r'^active/(.*)$', views.ActiveView.as_view(), name='active'), # 用户激活

    url(r'^login$', views.LoginView.as_view(), name='login'), # 登录
    url(r'^logout$', views.LogoutView.as_view(), name='logout'), # 登出

    url(r'^$', views.UserInfoView.as_view(), name='user'),  # 用户中心——信息页
    url(r'^order$', views.UserOrderView.as_view(), name='order'),  # 用户中心——订单页
    url(r'^address$', views.AddressView.as_view(), name='address'),  # 用户中心——地址页
]