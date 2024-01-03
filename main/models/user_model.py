from django.db import models
from django.contrib.auth.hashers import make_password
from datetime import datetime, timedelta
import jwt
import os

from django.conf import settings

class User(models.Model):
    fullname = models.CharField(max_length=50, null=False, blank=False)
    email = models.CharField(max_length=100, blank=False, unique=True)
    username = models.CharField(max_length=100, blank=False, unique=True)
    avatar = models.CharField(max_length=5000)
    avatar_id = models.CharField(max_length=200)
    password = models.CharField(max_length=500, blank=False, unique=True)
    refreshToken = models.CharField(max_length=500)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'Users'
        
    @classmethod
    def getUserById(self, id):
        try:
            return User.objects.get(id = id)
        except User.DoesNotExist:
            return None
    
    @classmethod        
    def getUserByUsername(self, username):
        try:
            return User.objects.get(username = username)
        except User.DoesNotExist:
            return None
    
    @classmethod
    def getUserByEmail(self, email):
        try:
            return User.objects.get(email=email)
        except User.DoesNotExist:
            return None
        
    @classmethod
    def create_user(self, data):
        try:
            user = User.objects.create(fullname = data.get('fullname'),
                                   email = data.get('email'),
                                   username = data.get('username'),
                                   avatar = data.get('avatar'),
                                   avatar_id = data.get('avatar_id'),
                                   password = make_password(data.get('password'))
                                   )
            user.save()
            return user
        except Exception as e:
            return None
        
    def to_dict(self):
        return {
            'fullname': self.fullname,
            'email': self.email,
            'username': self.username,
            'avatar': self.avatar,
            'avatar_id': self.avatar_id,
            'password': self.password,
            'refreshToken': self.refreshToken,
            'createdAt': self.createdAt,
            'updatedAt': self.updatedAt
        }
        
    def generateAccessToken(self):
        print(os.getenv('ACCESS_TOKEN_EXPIRY'))
        accessPayload = {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'exp': datetime.utcnow() + timedelta(days=int(os.getenv('ACCESS_TOKEN_EXPIRY'))),
            'iat': datetime.utcnow()
        }
        accessTokenSecretKey = os.getenv('ACCESS_TOKEN_SECRET')
        accessToken = jwt.encode(accessPayload, accessTokenSecretKey, algorithm='HS256') # generate a token
        
        return accessToken
    
    def generateRefreshToken(self):
        refreshPayload = {
            'id': self.id,
            'exp': datetime.utcnow() + timedelta(days=int(os.getenv('REFRESH_TOKEN_EXPIRY'))),
            'iat': datetime.utcnow()
        }
        refreshTokenSecretKey = os.getenv('REFRESH_TOKEN_SECRET')
        refreshToken = jwt.encode(refreshPayload, refreshTokenSecretKey, algorithm='HS256')
        
        return refreshToken
    
    def removeFields(self, fields):
        user = {}
        for field in self._meta.fields:
            if field.name not in fields:
                user[field.name] = getattr(self, field.name)
                
        return user