from .models import *
from django import forms


class AdminPanelForm(forms.ModelForm):
    class Meta:
        fields = ['cow_milk_rate', 'buffalo_milk_rate', 'mix_milk_rate']
        model = AdminPanel


class StatesForm(forms.ModelForm):
    class Meta:
        fields = ['value']
        model = States


class CitiesForm(forms.ModelForm):
    class Meta:
        fields = ['state', 'value']
        model = Cities
