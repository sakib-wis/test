from django.contrib import admin
from django import forms
from .models import *
# Register your models here.


class StatesForm(forms.ModelForm):
    class Meta:
        model = States
        exclude = ['end_date', 'start_date', 'enc_id']


@admin.register(States)
class StatesAdmin(admin.ModelAdmin):
    form = StatesForm
    list_display = (
        'enc_id',
        'value'
    )
    list_filter = ('start_date', 'end_date')
    search_fields = ('value',)


class CitiesForm(forms.ModelForm):
    class Meta:
        model = Cities
        exclude = ['end_date', 'start_date', 'enc_id']


@admin.register(Cities)
class CitiesAdmin(admin.ModelAdmin):
    form = CitiesForm
    list_display = (
        'enc_id',
        'value'
    )
    list_filter = ('start_date', 'end_date')
    search_fields = ('value',)


class CustomerForm(forms.ModelForm):
    class Meta:
        model = Customer
        exclude = ['end_date', 'start_date', 'enc_id']


@admin.register(Customer)
class CustomerAdmin(admin.ModelAdmin):
    form = CustomerForm
    list_display = (
        'enc_id',
        'first_name'
    )
    list_filter = ('start_date', 'end_date')
    search_fields = ('first_name',)
