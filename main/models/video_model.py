from django.db import models

from .user_model import User


class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    video = models.CharField(max_length=500)
    thumbnail = models.CharField(max_length=500)
    duration = models.DecimalField()
    views = models.IntegerField(default=0)
    user = models.ForeignKey(User)
    createAt = models.DateTimeField(add_auto_now=True)
    updateAt = models.DateTimeField(add_now=True)
    
    class Meta:
        db_table = 'Videos'
        
    @classmethod
    def create_video(self, data):
        try:
            video = Video.objects.create(title = data.get('title'),
                                         description = data.get('description'),
                                         video = data.get('video'),
                                         thumbnail = data.get('thumbnail'),
                                         duration = data.get('duration'),
                                         user = data.get('user')
                                         )
            video.save()
            return video
        except Exception as e:
            return None
    