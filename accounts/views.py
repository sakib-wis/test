# accounts/views.py

from django.views import View
from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from .forms import MobileLoginForm

class LoginView(View):
    def get(self, request):
        form = MobileLoginForm()
        return render(request, 'accounts/login.html', {'form': form})

    def post(self, request):
        form = MobileLoginForm(request, data=request.POST)
        if form.is_valid():
            login(request, form.get_user())
            return redirect('dashboard')
        return render(request, 'accounts/login.html', {'form': form})

class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('login')
