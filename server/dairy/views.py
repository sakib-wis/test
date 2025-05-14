from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .models import Customer, MilkSale
from .serializers import CustomerSerializer, MilkSaleSerializer
from django.utils.timezone import now

class DashboardView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = now().date()
        today_sales = MilkSale.objects.filter(date=today)
        total_qty = sum(s.quantity_ltr for s in today_sales)
        total_amount = sum(s.quantity_ltr * float(s.price_per_ltr) for s in today_sales)
        return Response({
            'date': str(today),
            'total_quantity_ltr': total_qty,
            'total_amount': total_amount
        })

class CustomerListCreateView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

class CustomerDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]

class MilkSaleCreateView(generics.CreateAPIView):
    serializer_class = MilkSaleSerializer
    permission_classes = [IsAuthenticated]

class AllMilkSalesView(generics.ListAPIView):
    queryset = MilkSale.objects.all()
    serializer_class = MilkSaleSerializer
    permission_classes = [IsAuthenticated]
