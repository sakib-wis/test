from .models import AdminPanel
from django import forms


class AdminPanelForm(forms.ModelForm):
    class Meta:
        fields = ['cow_milk_rate', 'buffalo_milk_rate', 'mix_milk_rate']
        model = AdminPanel
