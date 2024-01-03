from django.db import models

from .user_model import User


class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    video = models.CharField(max_length=500)
    video_id = models.CharField(max_length=100)
    thumbnail = models.CharField(max_length=500)
    thumbnail_id = models.CharField(max_length=100)
    duration = models.DecimalField(max_digits=8, decimal_places=3)
    views = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    createAt = models.DateTimeField(auto_now_add=True)
    updateAt = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'Videos'
        
    @classmethod
    def getVideoById(self, id):
        try:
            return Video.objects.get(id=id)
        except Exception as e:
            return None
        
    @classmethod
    def createVideo(self, data):
        try:
            video = Video.objects.create(title = data.get('title'),
                                         description = data.get('description'),
                                         video = data.get('video'),
                                         video_id = data.get('video_id'),
                                         thumbnail = data.get('thumbnail'),
                                         thumbnail_id = data.get('thumbnail_id'),
                                         duration = data.get('duration'),
                                         user = data.get('user')
                                         )
            video.save()
            return video
        except Exception as e:
            return None
        
    @classmethod
    def getAllVideoOfUser(self, userId):
        return Video.objects.filter(user_id = userId)
        
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'video': self.video,
            'thumbnail': self.thumbnail,
            'duration': self.duration,
            'views': self.views,
            'user': self.user,
            'createdAt': self.createAt,
            'updatedAt': self.updateAt
        }
    