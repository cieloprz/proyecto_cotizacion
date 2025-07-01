# users/serializers.py

from rest_framework import serializers
from django.contrib.auth import authenticate

class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(write_only=True)

    def validate(self, data):
        email = data.get('email')
        password = data.get('password')

        # Autenticamos con email y password
        user = authenticate(username=email, password=password)
        
        if not user:
            raise serializers.ValidationError("Credenciales inválidas o usuario no encontrado.")
        if not user.is_active:
            raise serializers.ValidationError("Usuario inactivo.")

        data['user'] = user
        return data



from .models import CustomUser

class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=8)

    class Meta:
        model = CustomUser
        fields = ['email', 'password']

    def create(self, validated_data):
        user = CustomUser.objects.create_user(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
