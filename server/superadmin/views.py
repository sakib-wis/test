from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views import View
from django.shortcuts import render
from django.contrib.auth import logout
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication
from django.contrib import messages
from django.db.models import Q
from django.utils.decorators import method_decorator
from dairy.models import States
from django.contrib.auth.views import LoginView
from accounts.models import User
from .serializers import *
from .models import *
from .forms import *
from helpers.custom_decorators import superuser_required


class SuperAdminLoginView(LoginView):
    template_name = 'superadmin/login.html'

    def dispatch(self, request, *args, **kwargs):
        if request.user.is_authenticated:
            # Change this to your target URL name
            return redirect('superadmin:dashboard')
        return super().dispatch(request, *args, **kwargs)


@method_decorator(superuser_required, name='dispatch')
class SuperAdminLogoutView(View):
    def get(self, request):
        logout(request)
        messages.success(request, 'You have been logged out successfully.')
        return redirect(reverse_lazy('superadmin:login'))


@method_decorator(superuser_required, name='dispatch')
class Dashboard(View):
    def get(self, request):
        return render(request, 'superadmin/dashboard.html')


@method_decorator(superuser_required, name='dispatch')
class ManageUsers(View):
    def get(self, request):
        query = Q(is_superuser=False)
        instance = User.objects.filter(query)
        context = {
            'page_obj': instance
        }
        return render(request, 'superadmin/manage_users.html', context)


@method_decorator(superuser_required, name='dispatch')
class AddUsersView(View):
    def get(self, request):
        form = CustomUserCreationForm()
        context = {
            'form': form
        }
        return render(request, 'superadmin/add_users.html', context)

    def post(self, request):
        form = CustomUserCreationForm(data=request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'User Added successful!')
            return redirect(reverse_lazy('superadmin:manage_users'))
        context = {
            'form': form
        }
        return render(request, 'superadmin/add_users.html', context)


@method_decorator(superuser_required, name='dispatch')
class EditUsersView(View):
    def get(self, request, enc_id):
        instance = User.objects.get(enc_id=enc_id)
        form = CustomUserChangeForm(instance=instance)
        context = {
            'form': form
        }
        return render(request, 'superadmin/edit_users.html', context)

    def post(self, request, enc_id):
        instance = User.objects.get(enc_id=enc_id)
        form = CustomUserChangeForm(instance=instance, data=request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'User Updated successful!')
            return redirect(reverse_lazy('superadmin:manage_users'))
        context = {
            'form': form
        }
        return render(request, 'superadmin/edit_users.html', context)


@method_decorator(superuser_required, name='dispatch')
class DeleteUsersView(View):
    def get(self, request, enc_id):
        User.objects.filter(enc_id=enc_id).delete()
        messages.success(request, 'User Deleted successful!')
        return redirect(reverse_lazy('superadmin:manage_users'))


@method_decorator(superuser_required, name='dispatch')
class ManageRates(View):
    def get(self, request):
        instance = AdminPanel.objects.first()
        context = {
            'page_obj': instance
        }
        return render(request, 'superadmin/manage_rates.html', context)


@method_decorator(superuser_required, name='dispatch')
class EditRates(View):
    def get(self, request):
        instance = AdminPanel.objects.first()
        form = AdminPanelForm(instance=instance)
        context = {
            'form': form
        }
        return render(request, 'superadmin/edit_rates.html', context)

    def post(self, request):
        form = AdminPanelForm(data=request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'Rates Updated successful!')
            return redirect(reverse_lazy('superadmin:manage_rates'))
        context = {
            'form': form
        }
        return render(request, 'superadmin/edit_rates.html', context)


@method_decorator(superuser_required, name='dispatch')
class ManageStates(View):
    def get(self, request):
        page_obj = States.objects.all()
        context = {
            'page_obj': page_obj
        }
        return render(request, 'superadmin/manage_states.html', context)


@method_decorator(superuser_required, name='dispatch')
class AddStatesView(View):
    def get(self, request):
        form = StatesForm()
        context = {
            'form': form
        }
        return render(request, 'superadmin/add_states.html', context)

    def post(self, request):
        form = StatesForm(data=request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'State Added successful!')
            return redirect(reverse_lazy('superadmin:manage_states'))
        context = {
            'form': form
        }
        return render(request, 'superadmin/add_states.html', context)


@method_decorator(superuser_required, name='dispatch')
class EditStatesView(View):
    def get(self, request, enc_id):
        instance = States.objects.get(enc_id=enc_id)
        form = StatesForm(instance=instance)
        context = {
            'form': form
        }
        return render(request, 'superadmin/edit_states.html', context)

    def post(self, request, enc_id):
        instance = States.objects.get(enc_id=enc_id)
        form = StatesForm(instance=instance, data=request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'State Updated successful!')
            return redirect(reverse_lazy('superadmin:manage_states'))
        context = {
            'form': form
        }
        return render(request, 'superadmin/edit_states.html', context)


@method_decorator(superuser_required, name='dispatch')
class DeleteStatesView(View):
    def get(self, request, enc_id):
        States.objects.filter(enc_id=enc_id).delete()
        messages.success(request, 'State Deleted successful!')
        return redirect(reverse_lazy('superadmin:manage_states'))


@method_decorator(superuser_required, name='dispatch')
class ManageCities(View):
    def get(self, request):
        instance = Cities.objects.all()
        context = {
            'page_obj': instance
        }
        return render(request, 'superadmin/manage_cities.html', context)


@method_decorator(superuser_required, name='dispatch')
class AddCitiesView(View):
    def get(self, request):
        states = States.objects.all()
        form = CitiesForm()
        context = {
            'form': form,
            "states": states
        }
        return render(request, 'superadmin/add_cities.html', context)

    def post(self, request):
        form = CitiesForm(data=request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'City Added successful!')
            return redirect(reverse_lazy('superadmin:manage_cities'))
        states = States.objects.all()
        context = {
            'form': form,
            "states": states
        }
        return render(request, 'superadmin/add_cities.html', context)


@method_decorator(superuser_required, name='dispatch')
class EditCitiesView(View):
    def get(self, request, enc_id):
        states = States.objects.all()
        instance = Cities.objects.get(enc_id=enc_id)
        form = CitiesForm(instance=instance)
        context = {
            'form': form,
            "states": states
        }
        return render(request, 'superadmin/edit_cities.html', context)

    def post(self, request, enc_id):
        instance = Cities.objects.get(enc_id=enc_id)
        form = CitiesForm(instance=instance, data=request.POST)
        if form.is_valid():
            form.save()
            messages.success(request, 'City Updated successful!')
            return redirect(reverse_lazy('superadmin:manage_cities'))
        states = States.objects.all()
        context = {
            'form': form,
            "states": states
        }
        return render(request, 'superadmin/edit_cities.html', context)


@method_decorator(superuser_required, name='dispatch')
class DeleteCitiesView(View):
    def get(self, request, enc_id):
        Cities.objects.filter(enc_id=enc_id).delete()
        messages.success(request, 'City Deleted successful!')
        return redirect(reverse_lazy('superadmin:manage_cities'))

# API


class AdminPanelView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        admin_panel = AdminPanel.objects.first()
        serializer = AdminPanelSerializer(admin_panel)
        return Response(serializer.data)
