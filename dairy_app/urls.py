from django.urls import path
from .views import DashboardView, AddCustomerView, SellMilkView, CustomerDetailView

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
    path('add-customer/', AddCustomerView.as_view(), name='add_customer'),
    path('sell-milk/', SellMilkView.as_view(), name='sell_milk'),
    path('customer/<int:customer_id>/',
         CustomerDetailView.as_view(), name='customer_detail'),
]
