from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import redirect
from django.urls import reverse,reverse_lazy
from .models import *
from .serializers import *
from django.utils.timezone import now

class DashboardView(APIView):
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
class StatesView(generics.ListCreateAPIView):
    queryset = States.objects.all()
    serializer_class = StatesSerializer
    permission_classes = [IsAuthenticated]
class CitiesView(generics.ListCreateAPIView):
    queryset = Cities.objects.all()
    serializer_class = CitiesSerializer
    permission_classes = [IsAuthenticated]

class AddCustomer(APIView):
    def post(self,request):
        serializer=CustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors,status=status.HTTP_400_BAD_REQUEST)

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
