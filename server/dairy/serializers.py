from rest_framework import serializers
from .models import *


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class AddCustomerSerializer(serializers.ModelSerializer):
    additional_notes = serializers.CharField(
        required=False, allow_null=True, allow_blank=True)

    class Meta:
        model = Customer
        exclude = ['id', 'enc_id']


class GetMilkSaleSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()

    class Meta:
        model = MilkSale
        fields = '__all__'


class MilkSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MilkSale
        fields = '__all__'


class StatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = States
        fields = '__all__'


class CitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cities
        fields = '__all__'
