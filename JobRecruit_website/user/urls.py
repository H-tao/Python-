from django.urls import path, re_path
from . import views

urlpatterns = [
    path('', views.index_handler, name='home'),
    path('jobs', views.jobs_handler, name='jobs'),
    path('query', views.query_handler, name='query'),
    path('detail', views.detail_handler, name='detail'),
]