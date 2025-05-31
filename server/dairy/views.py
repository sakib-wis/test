from pytz import timezone
from datetime import datetime, time, timedelta
from django.db.models.functions import ExtractHour, ExtractMonth
from django.db.models import Sum, Q
from django.utils.timezone import make_aware, now
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
from superadmin.models import States, Cities
from .serializers import *
from django.utils.timezone import now, timedelta

month_labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
kolkata = timezone('Asia/Kolkata')


class DashboardView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get_daily_sales_data(self, query):
        time_buckets = {
            "6AM": range(6, 9),
            "9AM": range(9, 12),
            "12PM": range(12, 15),
            "3PM": range(15, 18),
            "6PM": range(18, 21),
            "9PM": range(21, 24),
        }
        today = now().date()
        start_datetime = make_aware(datetime.combine(today, time.min))
        end_datetime = make_aware(datetime.combine(today, time.max))
        sales = (
            MilkSale.objects
            .filter(query, timestamp__range=(start_datetime, end_datetime))
            .annotate(hour=ExtractHour('timestamp'))
            .values('hour')
            .annotate(total_liters=Sum('quantity'))
        )

        # Initialize bucket data
        bucket_data = {label: 0 for label in time_buckets}

        # Assign sales to buckets
        for sale in sales:
            hour = sale['hour']
            liters = sale['total_liters']
            for label, hour_range in time_buckets.items():
                if hour in hour_range:
                    bucket_data[label] += liters
                    break

        # Convert to list for frontend
        return [{"time": label, "liters": bucket_data[label]}
                for label in time_buckets]

    def get_monthly_sales_data(self, query):
        current_year = now().year
        sales = (
            MilkSale.objects
            .filter(query, timestamp__year=current_year)
            .annotate(month=ExtractMonth('timestamp'))
            .values('month')
            .annotate(total_liters=Sum('quantity'))
        )

        monthly_totals = {i + 1: 0 for i in range(12)}
        for item in sales:
            monthly_totals[item['month']] = item['total_liters']
        return [
            {'month': month_labels[i], 'liters': monthly_totals[i + 1]}
            for i in range(12)
        ]

    def get_monthly_payment_data(self, query):
        current_year = now().year
        sales = (
            MilkSale.objects
            .filter(query, timestamp__year=current_year, payment_method__in=['online', 'cash'])
            .annotate(month=ExtractMonth('timestamp'))
            .values('month', 'payment_method')
            .annotate(total_price=Sum('price'))
        )
        monthly_data = {
            i + 1: {'month': month_labels[i], 'online': 0, 'cash': 0} for i in range(12)}
        for item in sales:
            month = item['month']
            method = item['payment_method']
            liters = item['total_price']
            monthly_data[month][method] = liters
        return list(monthly_data.values())

    def get(self, request):
        user_id = request.user.id
        current_time = now().astimezone(kolkata)
        today = current_time.date()
        start_of_today = kolkata.localize(datetime.combine(today, time.min))
        end_of_today = kolkata.localize(datetime.combine(today, time.max))
        start_of_week = kolkata.localize(datetime.combine(
            today - timedelta(days=today.weekday()), time.min))  # Monday
        start_of_month = kolkata.localize(
            datetime.combine(today.replace(day=1), time.min))
        start_of_year = kolkata.localize(datetime.combine(
            today.replace(month=1, day=1), time.min))
        query = Q(user_id=user_id, end_date__isnull=True)
        today_totals = MilkSale.objects.filter(query,  timestamp__range=(start_of_today, end_of_today)).aggregate(
            total_price=Sum('price'),
            total_quantity=Sum('quantity')
        )
        week_totals = MilkSale.objects.filter(query, timestamp__range=(start_of_week, end_of_today)).aggregate(
            total_price=Sum('price'),
            total_quantity=Sum('quantity')
        )

        monthly_totals = MilkSale.objects.filter(query, timestamp__range=(start_of_month, end_of_today)).aggregate(
            total_price=Sum('price'),
            total_quantity=Sum('quantity')
        )

        yearly_totals = MilkSale.objects.filter(query, timestamp__range=(start_of_year, end_of_today)).aggregate(
            total_price=Sum('price'),
            total_quantity=Sum('quantity')
        )
        total_sale = MilkSale.objects.filter(
            query).count()
        online_sale = MilkSale.objects.filter(
            query, payment_method='online').count()
        online_percentage = round(
            online_sale / total_sale * 100, 2) if total_sale > 0 else 0
        cash_percentage = round(100-online_percentage, 2)
        total_customer = Customer.objects.filter(query).count()
        dailySalesData = self.get_daily_sales_data(query)
        monthlySalesData = self.get_monthly_sales_data(query)
        dailyPaymentData = [
            {'name': "Online", 'value': online_percentage},
            {'name': "Cash", 'value': cash_percentage},
        ]
        monthlyPaymentData = self.get_monthly_payment_data(query)
        return Response({
            'today_totals': today_totals,
            'week_totals': week_totals,
            'monthly_totals': monthly_totals,
            'yearly_totals': yearly_totals,
            'total_customer': total_customer,
            'online_percentage': online_percentage,
            "dailySalesData": dailySalesData,
            'monthlySalesData': monthlySalesData,
            "dailyPaymentData": dailyPaymentData,
            "monthlyPaymentData": monthlyPaymentData
        })


class StatesView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        states = States.objects.all()
        serializers = StatesSerializer(states, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class CitiesView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        cities = Cities.objects.all()
        serializers = CitiesSerializer(cities, many=True)
        return Response(serializers.data, status=status.HTTP_200_OK)


class CustomersView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user_id = request.user.id
        query = Q(user_id=user_id, end_date__isnull=True)
        customers = Customer.objects.filter(query)
        serializer = CustomerSerializer(customers, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)


class AddCustomer(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = AddCustomerSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CustomerDetailView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

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


class MilkSaleCreateView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer = MilkSaleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AllMilkSalesView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user_id = request.user.id
        fromDate = request.data.get('fromDate')
        toDate = request.data.get('toDate')
        query = Q(user_id=user_id, end_date__isnull=True)
        if fromDate:
            query &= Q(timestamp__gte=fromDate)
        if toDate:
            query &= Q(timestamp__lte=toDate)
        milk_sales = MilkSale.objects.filter(query).order_by('id')
        totals = MilkSale.objects.filter(query).aggregate(
            total_price=Sum('price'),
            total_quantity=Sum('quantity')
        )
        serializer = GetMilkSaleSerializer(milk_sales, many=True)
        context = {
            'total': totals,
            'data': serializer.data
        }
        return Response(context, status=status.HTTP_200_OK)
