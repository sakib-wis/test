from django.contrib import admin
from .models import User
# Register your models here.
admin.site.site_header = "Milk ATM Admin"
admin.site.site_title = "Milk ATM Admin Portal"
admin.site.index_title = "Welcome to Milk ATM Admin Portal"
admin.site.site_url = "https://milk-atm.com"
admin.site.register(User)
