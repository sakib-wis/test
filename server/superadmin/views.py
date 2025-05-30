from django.shortcuts import redirect
from django.urls import reverse_lazy
from django.views import View
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication
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
            return redirect(reverse_lazy('superadmin:manage_rates'))
        context = {
            'form': form
        }
        return render(request, 'superadmin/edit_rates.html', context)


class ManageStates(View):
    def get(self, request):
        instance = AdminPanel.objects.first()
        context = {
            'page_obj': instance
        }
        return render(request, 'superadmin/manage_states.html', context)


class AddStatesView(View):
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
            return redirect(reverse_lazy('superadmin:manage_rates'))
        context = {
            'form': form
        }
        return render(request, 'superadmin/edit_rates.html', context)


class StatesDetailView(View):
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
            return redirect(reverse_lazy('superadmin:manage_rates'))
        context = {
            'form': form
        }
        return render(request, 'superadmin/edit_rates.html', context)


class ManageCities(View):
    def get(self, request):
        instance = AdminPanel.objects.first()
        context = {
            'page_obj': instance
        }
        return render(request, 'superadmin/manage_cities.html', context)


class AddCitiesView(View):
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
            return redirect(reverse_lazy('superadmin:manage_rates'))
        context = {
            'form': form
        }


class CitiesDetailView(View):
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
            return redirect(reverse_lazy('superadmin:manage_rates'))
        context = {
            'form': form
        }
        return render(request, 'superadmin/edit_rates.html', context)


class AdminPanelView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        admin_panel = AdminPanel.objects.first()
        serializer = AdminPanelSerializer(admin_panel)
        return Response(serializer.data)
