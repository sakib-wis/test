from django.db import models
from .base_models import BaseModel
from accounts.models import User
from superadmin.models import States, Cities


class Customer(BaseModel):
    CUSTOMER_TYPE = [
        ('individual', 'Individual'),
        ('business', 'Business'),
        ('reseller', 'Reseller')
    ]
    PREFERRED_PAYMENT_METHOD = [
        ('cash', 'Cash'),
        ('online', 'Online Payment'),

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
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='customers', null=True)
    first_name = models.CharField(max_length=100, null=True)
    last_name = models.CharField(max_length=100, null=True)
    phone_number = models.CharField(max_length=15, null=True)
    address = models.TextField(null=True)
    city = models.ForeignKey(
        Cities, on_delete=models.CASCADE, related_name='customers', null=True)
    state = models.ForeignKey(
        States, on_delete=models.CASCADE, related_name='customers', null=True)
    customer_type = models.CharField(
        max_length=200, choices=CUSTOMER_TYPE, default='individual')
    preferred_payment_method = models.CharField(
        max_length=200, choices=PREFERRED_PAYMENT_METHOD, default='cash')
    delivery_schedule = models.CharField(
        max_length=200, choices=DELIVERY_SCHEDULE, default='morning')
    delivery_frequency = models.CharField(
        max_length=200, choices=DELIVERY_FREQUENCY, default='daily')
    additional_notes = models.TextField(null=True, default=None)

    class Meta:
        db_table = 'customers'


class MilkSale(BaseModel):
    MILK_TYPE = [
        ('1', 'Mix'),
        ('2', 'Buffalo'),
        ('3', 'Cow'),
    ]
    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='milk_sale', null=True)
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    quantity = models.DecimalField(max_digits=10, decimal_places=2)
    milk_type = models.CharField(max_length=5, choices=MILK_TYPE, default='1')
    payment_method = models.CharField(
        max_length=50, choices=Customer.PREFERRED_PAYMENT_METHOD, default='cash')
    price = models.DecimalField(max_digits=6, decimal_places=2)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'milk_sale'
