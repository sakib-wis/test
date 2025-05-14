from rest_framework import serializers
from .models import Customer, MilkSale

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class MilkSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MilkSale
        fields = '__all__'
