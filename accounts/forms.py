from django import forms
from django.contrib.auth.forms import AuthenticationForm


class MobileLoginForm(AuthenticationForm):
    username = forms.CharField(label='Mobile', max_length=15)
