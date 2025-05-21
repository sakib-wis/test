from django.db import models
from .base_model import BaseModel


class States(BaseModel):
    value = models.CharField(max_length=200)

    class Meta:
        db_table = "states"


class Cities(BaseModel):
    value = models.CharField(max_length=200)

    class Meta:
        db_table = "cities"


class Customer(BaseModel):
    first_name = models.CharField(max_length=100, null=True)
    last_name = models.CharField(max_length=100, null=True)
    phone_number = models.CharField(max_length=15, null=True)
    street_address = models.TextField(null=True)
    city = models.ForeignKey(
        Cities, on_delete=models.SET_NULL, related_name='customer', null=True)
    states = models.ForeignKey(
        States, on_delete=models.SET_NULL, related_name='customer', null=True)

    class Meta:
        db_table = 'customer'


class MilkSale(BaseModel):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    quantity_ltr = models.FloatField()
    price_per_ltr = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'milk_sale'
