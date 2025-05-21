from django.db import models
import uuid


class BaseModel(models.Model):
    enc_id = models.UUIDField(
        primary_key=True, default=uuid.uuid4, editable=False)
    start_date = models.DateTimeField(null=True, auto_now_add=True)
    end_date = models.DateTimeField(null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True
