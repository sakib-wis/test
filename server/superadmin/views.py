from django.views import View
from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.authentication import SessionAuthentication
from .serializers import *
from .models import *


class Dashboard(View):
    def get(self, request):
        return render(request, 'superadmin/dashboard.html')


class AdminPanelView(APIView):
    authentication_classes = [JWTAuthentication, SessionAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        admin_panel = AdminPanel.objects.first()
        serializer = AdminPanelSerializer(admin_panel)
        return Response(serializer.data)
