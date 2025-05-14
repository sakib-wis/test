from django.db import models

class Customer(models.Model):
    name = models.CharField(max_length=100)
    mobile = models.CharField(max_length=15)
    address = models.TextField()

class MilkSale(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE)
    quantity_ltr = models.FloatField()
    price_per_ltr = models.DecimalField(max_digits=6, decimal_places=2)
    date = models.DateField(auto_now_add=True)
