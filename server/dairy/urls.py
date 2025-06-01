from django.urls import path
from .views import *
app_name = 'dairy'

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('states/', StatesView.as_view(), name='states'),
    path('cities/', CitiesView.as_view(), name='cities'),
    path('customers/', CustomersView.as_view(), name='customers'),
    path('customers/<str:enc_id>/',
         CustomerDetailView.as_view(), name='customer_detail'),
    path('add_customer/', AddCustomer.as_view(), name='add_customer'),
    path('milk-sales/', MilkSaleCreateView.as_view(), name='milk_sales'),
    path('get-milk-sales/', AllMilkSalesView.as_view(), name='all_milk_sales'),
    path('milk-sales/<str:enc_id>/',
         MilkSaleDetailView.as_view(), name='milk_sales_edit'),
]
