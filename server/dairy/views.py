from datetime import datetime
from django.db.models import Sum, Q
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
from django.utils.timezone import now, timedelta


class DashboardView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        today = now().date()
        start_of_week = today - timedelta(days=today.weekday())  # Monday
        start_of_month = today.replace(day=1)
        start_of_year = today.replace(month=1, day=1)

        today_totals = MilkSale.objects.filter(date=today).aggregate(
            total_price=Sum('price'),
            total_quantity=Sum('quantity')
        )
        print(">>>>>>", today_totals)
        week_totals = MilkSale.objects.filter(date__gte=start_of_week, date__lte=today).aggregate(
            total_price=Sum('price'),
            total_quantity=Sum('quantity')
        )

        monthly_totals = MilkSale.objects.filter(date__gte=start_of_month, date__lte=today).aggregate(
            total_price=Sum('price'),
            total_quantity=Sum('quantity')
        )

        yearly_totals = MilkSale.objects.filter(date__gte=start_of_year, date__lte=today).aggregate(
            total_price=Sum('price'),
            total_quantity=Sum('quantity')
        )
        total_customer = Customer.objects.filter(end_date__isnull=True).count()
        return Response({
            'today_totals': today_totals,
            'week_totals': week_totals,
            'monthly_totals': monthly_totals,
            'yearly_totals': yearly_totals,
            'total_customer': total_customer
        })


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


class CustomersView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        query = Q(end_date__isnull=True)
        customers = Customer.objects.filter(query)
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddCustomer(APIView):
    def post(self, request):
        serializer = AddCustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerDetailView(APIView):
    def get(self, request, enc_id):
        customer = get_object_or_404(Customer, enc_id=enc_id)
        serializer = CustomerSerializer(customer)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def patch(self, request, enc_id):
        customer = get_object_or_404(Customer, enc_id=enc_id)
        serializer = AddCustomerSerializer(
            data=request.data, instance=customer)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, enc_id):
        Customer.objects.filter(enc_id=enc_id).update(end_date=datetime.now())
        return Response({'res': "Customer Deleted"}, status=status.HTTP_201_CREATED)


class MilkSaleCreateView(generics.CreateAPIView):
    serializer_class = MilkSaleSerializer
    permission_classes = [IsAuthenticated]


class AllMilkSalesView(APIView):
    permission_classes = [IsAuthenticated]

    def post(self, request):
        fromDate = request.data.get('fromDate')
        toDate = request.data.get('toDate')
        query = Q(end_date__isnull=True)
        if fromDate:
            query &= Q(date__gte=fromDate)
        if toDate:
            query &= Q(date__lte=toDate)
        queryset = MilkSale.objects.filter(query).order_by('id')
        totals = MilkSale.objects.filter(query).aggregate(
            total_price=Sum('price'),
            total_quantity=Sum('quantity')
        )
        serializer = GetMilkSaleSerializer(queryset, many=True)
        context = {
            'total': totals,
            'data': serializer.data
        }
        return Response(context, status=status.HTTP_200_OK)
