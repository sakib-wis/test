from rest_framework import serializers
from .models import *

class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'

class MilkSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MilkSale
        fields = '__all__'
class StatesSerializer(serializers.ModelSerializer):
    class Meta:
        model=States
        fields = '__all__'
class CitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model=Cities
        fields = '__all__'