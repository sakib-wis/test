from rest_framework import generics, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.shortcuts import redirect
from django.urls import reverse, reverse_lazy
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication
from django.shortcuts import get_object_or_404
from .models import *
from .serializers import *
from django.utils.timezone import now


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = now().date()
        today_sales = MilkSale.objects.filter(date=today)
        total_qty = sum(s.quantity_ltr for s in today_sales)
        total_amount = sum(s.quantity_ltr * float(s.price_per_ltr)
                           for s in today_sales)
        return Response({
            'date': str(today),
            'total_quantity_ltr': total_qty,
            'total_amount': total_amount
        })


class CustomerListCreateView(generics.ListCreateAPIView):
    queryset = Customer.objects.all()
    serializer_class = CustomerSerializer
    permission_classes = [IsAuthenticated]


class StatesView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        states = States.objects.all()
        serializers = StatesSerializer(states, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class CitiesView(generics.ListCreateAPIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cities = Cities.objects.all()
        serializers = CitiesSerializer(cities, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class AddCustomer(APIView):
    def post(self, request):
        serializer = AddCustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class EditCustomer(APIView):
    def patch(self, request, enc_id):
        customer = get_object_or_404(Customer, enc_id=enc_id)
        serializer = AddCustomerSerializer(
            data=request.data, instance=customer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerDetailView(APIView):
    def get(self, request, enc_id):
        customer = get_object_or_404(Customer, enc_id=enc_id)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)


class MilkSaleCreateView(generics.CreateAPIView):
    serializer_class = MilkSaleSerializer
    permission_classes = [IsAuthenticated]


class AllMilkSalesView(generics.ListAPIView):
    queryset = MilkSale.objects.all()
    serializer_class = GetMilkSaleSerializer
    permission_classes = [IsAuthenticated]
