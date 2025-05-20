from django.db import models
from .base_models import BaseModel


class States(BaseModel):
    value = models.CharField(max_length=200)

    class Meta:
        db_table = 'states'


class Cities(BaseModel):
    state = models.ForeignKey(
        States, on_delete=models.CASCADE, related_name='cities')
    value = models.CharField(max_length=200)

    class Meta:
        db_table = 'cities'


class Customer(BaseModel):
    CUSTOMER_TYPE = [
        ('individual', 'Individual'),
        ('business', 'Business'),
        ('reseller', 'Reseller')
    ]
    PREFERRED_PAYMENT_METHOD = [
        ('cash', 'Cash'),
        ('online', 'Online Payment'),
        ('credit', 'Credit Card'),
        ('upi', 'UPI')
    ]
    DELIVERY_SCHEDULE = [
        ('morning', 'Morning (6AM - 9AM)'),
        ('evening', 'Evening (4PM - 7PM)'),
        ('both', 'Both Morning & Evening')
    ]
    DELIVERY_FREQUENCY = [
        ("daily", 'Daily'),
        ("alternate", 'Alternate Days'),
        ("weekly", 'Weekly')
    ]
    first_name = models.CharField(max_length=100, null=True)
    last_name = models.CharField(max_length=100, null=True)
    phone_number = models.CharField(max_length=15, null=True)
    address = models.TextField(null=True)
    city = models.ForeignKey(
        Cities, on_delete=models.CASCADE, related_name='customer', null=True)
    state = models.ForeignKey(
        States, on_delete=models.CASCADE, related_name='customer', null=True)
    customer_type = models.CharField(
        max_length=200, choices=CUSTOMER_TYPE, default='individual')
    preferred_payment_method = models.CharField(
        max_length=200, choices=PREFERRED_PAYMENT_METHOD, default='cash')
    delivery_schedule = models.CharField(
        max_length=200, choices=DELIVERY_SCHEDULE, default='morning')
    delivery_frequency = models.CharField(
        max_length=200, choices=DELIVERY_FREQUENCY, default='daily')
    additional_notes = models.TextField(null=True)

    class Meta:
        db_table = 'customers'


class MilkSale(BaseModel):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    quantity = models.FloatField()
    price = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateField(auto_now_add=True)

    class Meta:
        db_table = 'milk_sale'
