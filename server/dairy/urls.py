from django.urls import path
from .views import *

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('states/', StatesView.as_view(), name="states"),
    path('cities/', CitiesView.as_view(), name="cities"),
    path('customers/', CustomerListCreateView.as_view(), name='customers'),
    path('customers/<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('milk-sale/', MilkSaleCreateView.as_view(), name='milk-sale'),
    path('milk-sales/', AllMilkSalesView.as_view(), name='all-milk-sales'),
]
