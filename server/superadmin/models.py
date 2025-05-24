from django.db import models
from dairy.base_models import BaseModel

# Create your models here.


class AdminPanel(BaseModel):
    cow_milk_rate = models.IntegerField(null=True)
    buffalo_milk_rate = models.IntegerField(null=True)
    mix_milk_rate = models.IntegerField(null=True)

    class Meta:
        verbose_name = "AdminPanel"
        verbose_name_plural = "AdminPanels"
        db_table = 'admin_panel'
