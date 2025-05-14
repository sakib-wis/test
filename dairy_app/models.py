from django.db import models
from django.conf import settings


class Customer(models.Model):
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    address = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name


class Sale(models.Model):
    MILK_CHOICES = [(0.25, '250 ml'), (0.5, '500 ml'),
                    (1, '1 litre'), (2, '2 litres'), (3, '3 litres')]
    PAYMENT_CHOICES = [('cash', 'Cash'), ('online', 'Online')]
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    staff = models.ForeignKey(settings.AUTH_USER_MODEL,
                              on_delete=models.CASCADE)
    quantity = models.FloatField(choices=MILK_CHOICES)
    payment_method = models.CharField(max_length=10, choices=PAYMENT_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.customer.name} - {self.quantity} L"
