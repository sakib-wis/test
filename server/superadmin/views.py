from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views import View
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication
from django.contrib import messages
from dairy.models import States
from .serializers import *
from .models import *
from .forms import *


class Dashboard(View):
    def get(self, request):
        return render(request, 'superadmin/dashboard.html')


class ManageRates(View):
    def get(self, request):
        instance = AdminPanel.objects.first()
        context = {
            'page_obj': instance
        }
        return render(request, 'superadmin/manage_rates.html', context)


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


class ManageStates(View):
    def get(self, request):
        page_obj = States.objects.all()
        context = {
            'page_obj': page_obj
        }
        return render(request, 'superadmin/manage_states.html', context)


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


class DeleteStatesView(View):
    def get(self, request, enc_id):
        States.objects.filter(enc_id=enc_id).delete()
        messages.success(request, 'State Deleted successful!')
        return redirect(reverse_lazy('superadmin:manage_states'))


class ManageCities(View):
    def get(self, request):
        instance = Cities.objects.all()
        context = {
            'page_obj': instance
        }
        return render(request, 'superadmin/manage_cities.html', context)


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
