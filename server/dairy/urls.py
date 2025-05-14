from django.urls import path
from .views import (
    DashboardView,
    CustomerListCreateView,
    CustomerDetailView,
    MilkSaleCreateView,
    AllMilkSalesView,
)

urlpatterns = [
    path('dashboard/', DashboardView.as_view(), name='dashboard'),
    path('customers/', CustomerListCreateView.as_view(), name='customers'),
    path('customers/<int:pk>/', CustomerDetailView.as_view(), name='customer-detail'),
    path('milk-sale/', MilkSaleCreateView.as_view(), name='milk-sale'),
    path('milk-sales/', AllMilkSalesView.as_view(), name='all-milk-sales'),
]
