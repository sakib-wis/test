from django.shortcuts import render

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .models import User


class LoginView(APIView):
    def post(self, request):
        phone_number = request.data.get('phone_number')
        password = request.data.get('password')
        user = authenticate(
            request, phone_number=phone_number, password=password)
        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'user': {
                    'id': user.id,
                    'phone_number': user.phone_number,
                }
            })
        return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserView(APIView):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            return Response({
                'id': user.id,
                'phone_number': user.phone_number,
            })
        return Response({'error': 'User not authenticated'}, status=status.HTTP_401_UNAUTHORIZED)
