from django.db import models

from .user_model import User


class Video(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    video_url = models.CharField(max_length=500)
    video_id = models.CharField(max_length=100)
    thumbnail_url = models.CharField(max_length=500)
    thumbnail_id = models.CharField(max_length=100)
    duration = models.IntegerField()
    views = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    createAt = models.DateTimeField(auto_now_add=True)
    updateAt = models.DateTimeField(auto_now=True)
    
    class Meta:
        db_table = 'Videos'
        
    @classmethod
    def getVideoById(self, videoId):
        try:
            return Video.objects.get(id = videoId)
        except Exception as e:
            return None
        
    @classmethod
    def createVideo(self, data):
        try:
            video = Video.objects.create(title = data.get('title'),
                                         description = data.get('description'),
                                         video_url = data.get('video_url'),
                                         video_id = data.get('video_id'),
                                         thumbnail_url = data.get('thumbnail_url'),
                                         thumbnail_id = data.get('thumbnail_id'),
                                         duration = data.get('duration'),
                                         user_id = data.get('userId')
                                         )
            video.save()
            return video
        except Exception as e:
            return None
        
    # @classmethod
    # def getAllVideoOfUser(self, userId):
    #     return Video.objects.filter(user_id = userId)
    
    @classmethod
    def getAllVideos(self):
        videos = Video.objects.all()
        videosList = [
            video.to_dict() for video in videos
        ]
        return videosList
    
    
    @classmethod
    def getAllVideosOfUser(self, userId):
        videos = Video.objects.filter(user_id = userId)
        videosList = [
            video.to_dict() for video in videos
        ]
        return videosList
    
        
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'description': self.description,
            'videoUrl': self.video_url,
            'thumbnailUrl': self.thumbnail_url,
            'duration': self.duration,
            'views': self.views,
            'user' : {
                'userId': self.user.id,
                'username': '@' + self.user.username,
                'avatar': self.user.avatar,
            },
            
            'createdAt': self.createAt.strftime('%Y-%m-%d %H:%M:%S'),
            'updatedAt': self.updateAt.strftime('%Y-%m-%d %H:%M:%S')
        }
    