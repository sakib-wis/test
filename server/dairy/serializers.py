from rest_framework import serializers
from .models import Cities, Customer, MilkSale, States


class StateSerializer(serializers.ModelSerializer):
    class Meta:
        model = States
        fields = '__all__'


class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = Cities
        fields = '__all__'


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class MilkSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MilkSale
        fields = '__all__'
