from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from django.contrib.auth.mixins import LoginRequiredMixin
from .forms import CustomerForm, SaleForm
from .models import Customer, Sale


class DashboardView(LoginRequiredMixin, View):
    def get(self, request):
        return render(request, 'dairy_app/dashboard.html')


class AddCustomerView(LoginRequiredMixin, View):
    def get(self, request):
        form = CustomerForm()
        return render(request, 'dairy_app/add_customer.html', {'form': form})

    def post(self, request):
        form = CustomerForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('dashboard')
        return render(request, 'dairy_app/add_customer.html', {'form': form})


class SellMilkView(LoginRequiredMixin, View):
    def get(self, request):
        form = SaleForm()
        return render(request, 'dairy_app/sell_milk.html', {'form': form})

    def post(self, request):
        form = SaleForm(request.POST)
        if form.is_valid():
            sale = form.save(commit=False)
            sale.staff = request.user
            sale.save()
            return redirect('dashboard')
        return render(request, 'dairy_app/sell_milk.html', {'form': form})


class CustomerDetailView(LoginRequiredMixin, View):
    def get(self, request, customer_id):
        customer = get_object_or_404(Customer, id=customer_id)
        sales = Sale.objects.filter(customer=customer)
        return render(request, 'dairy_app/customer_detail.html', {
            'customer': customer,
            'sales': sales,
        })
