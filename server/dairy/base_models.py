from django.db import models
class BaseModel(models.Model):
    enc_id = models.CharField(
        max_length=200, unique=True, db_index=True, null=True)
    start_date = models.DateTimeField(auto_now_add=True, null=True)
    end_date = models.DateTimeField(null=True)

    class Meta:
        abstract = True
