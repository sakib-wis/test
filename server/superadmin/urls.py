from django.urls import path
from .views import *
app_name = 'superadmin'

urlpatterns = [
    path('', Dashboard.as_view(), name='dashboard'),
    path('api/admin-panel/', AdminPanelView.as_view(), name='admin_panel'),
]
