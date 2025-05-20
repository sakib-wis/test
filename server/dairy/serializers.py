from rest_framework import serializers
from .models import *


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        exclude = ['id', 'enc_id']


class AddCustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        exclude = ['id', 'enc_id']


class MilkSaleSerializer(serializers.ModelSerializer):
    class Meta:
        model = MilkSale
        exclude = ['id', 'enc_id']


class StatesSerializer(serializers.ModelSerializer):
    class Meta:
        model = States
        exclude = ['id', 'enc_id']


class CitiesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cities
        exclude = ['id', 'enc_id']
