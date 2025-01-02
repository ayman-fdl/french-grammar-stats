from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('dashboard/', views.dashboard, name='dashboard'),
    path('submit/', views.handle_input, name='handle_input'),
    path('api/result/', views.result_json_view, name='result_json'),
]
