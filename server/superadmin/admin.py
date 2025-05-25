from django.contrib import admin
from django import forms
from .models import *
# Register your models here.


class AdminPanelForm(forms.ModelForm):
    class Meta:
        model = AdminPanel
        exclude = ['end_date', 'start_date', 'enc_id']


@admin.register(AdminPanel)
class AdminPanelAdmin(admin.ModelAdmin):
    form = AdminPanelForm
    list_display = (
        'enc_id',
        'cow_milk_rate',
        'buffalo_milk_rate',
    )
    list_filter = ('start_date', 'end_date')
