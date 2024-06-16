from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Event

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user

class EventSerializer(serializers.ModelSerializer):
    user = serializers.ReadOnlyField(source='user.username')  # Make user field read-only
    invitees = UserSerializer(many=True, read_only=True)
    invitee_ids = serializers.PrimaryKeyRelatedField(
        many=True, queryset=User.objects.all(), write_only=True, source='invitees', default=[]
    )
    class Meta:
        model = Event
        fields = ['id', 'title', 'description', 'date', 'location', 'user', 'reminder', 'invitees', 'invitee_ids']

    def create(self, validated_data):
        # Extract user from context (authenticated user)
        user = self.context['request'].user
        invitees = validated_data.pop('invitees', [])
        
        event = Event.objects.create(
            user=user,  # Assign user object directly
            **validated_data
        )
        event.invitees.set(invitees)
        return event