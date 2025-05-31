from django.db import models
from dairy.base_models import BaseModel

# Create your models here.


class States(BaseModel):
    value = models.CharField(max_length=200)

    class Meta:
        db_table = 'states'


class Cities(BaseModel):
    state = models.ForeignKey(
        States, on_delete=models.CASCADE, related_name='cities', null=True)
    value = models.CharField(max_length=200)

    class Meta:
        db_table = 'cities'


class AdminPanel(BaseModel):
    cow_milk_rate = models.IntegerField(null=True)
    buffalo_milk_rate = models.IntegerField(null=True)
    mix_milk_rate = models.IntegerField(null=True)

    class Meta:
        verbose_name = "AdminPanel"
        verbose_name_plural = "AdminPanels"
        db_table = 'admin_panel'
