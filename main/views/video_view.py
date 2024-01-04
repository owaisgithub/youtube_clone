from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from rest_framework import status

from main.models.video_model import Video 
from main.utils.cloudinary import uploadOnCloudinry, deleteFromCloudinry
from main.utils.api_response import apiResponse
from main.utils.api_error import apiError


class VideoView(APIView):
    
    def get(self, request, videoId=None):
        video = Video.getVideoById(videoId)
        if video is None:
            return Response(apiError(404, 'Video does not exist'), status=status.HTTP_404_NOT_FOUND)
        
        return Response(apiResponse(200, 'get video successfully', video.to_dict()), status=status.HTTP_200_OK)
    
    def post(self, request):
        video = request.data.get('video')
        thumbnail = request.data.get('thumbnail')
        
        print(video)
        videoResponse = uploadOnCloudinry(video)
        print(videoResponse)
        if videoResponse is None:
            print("This is video response error")
            return Response(apiError(500, 'internal server error'), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        thumbnailResponse = uploadOnCloudinry(thumbnail)
        if thumbnailResponse is None:
            print('this is thumbnail response error')
            deleteFromCloudinry(videoResponse.get('public_id'))
            return Response(apiError(500, 'internal server error'), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        data = {
            'title': request.data.get('title'),
            'description': request.data.get('description'),
            'video': videoResponse.get('url'),
            'video_id': videoResponse.get('public_id'),
            'thumbnail': thumbnailResponse.get('url'),
            'thumbnail_id': thumbnailResponse.get('public_id'),
            'duration': videoResponse.get('duration'),
            'userId': request.user.id
        }
        
        print(data)
        
        videoObject = Video.createVideo(data)
        print(videoObject)
        if videoObject is None:
            return Response(apiError(500, 'internal server error'), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        return Response(apiResponse(201, 
                                    "video upload successfully", 
                                    videoObject.to_dict()), 
                        status=status.HTTP_201_CREATED)
        
    def put(self, request, videoId):
        if request.data.get('video') is not None:
            videoObject = Video.getVideoById(videoId)
            
            uploadResponse = uploadOnCloudinry(request.data.get('video'))
            if uploadResponse is None:
                return Response(apiError(500, 'internal server error'), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            deleteResponse = deleteFromCloudinry(videoObject.video_id)
            if deleteResponse is None:
                deleteFromCloudinry(uploadResponse.get('public_id'))
                return Response(apiError(500, 'internal server error'), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            videoObject.video = uploadResponse.get('url')
            videoObject.video_id = uploadResponse.get('public_id')
            videoObject.duration = uploadResponse.get('duration')
            videoObject.save()
            
            return Response(apiResponse(200, "video updated successfully"), status=status.HTTP_200_OK)
        
        elif request.data.get('thumbnail') is not None:
            videoObject = Video.getVideoById(videoId)
            
            uploadResponse = uploadOnCloudinry(request.data.get('thumbnail'))
            if uploadResponse is None:
                return Response(apiError(500, 'internal server error'), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            deleteResponse = deleteFromCloudinry(videoObject.thumbnail_id)
            if deleteResponse is None:
                deleteFromCloudinry(uploadResponse.get('public_id'))
                return Response(apiError(500, 'internal server error'), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
            videoObject.thumbnail = uploadResponse.get('url')
            videoObject.thumbnail_id = uploadResponse.get('public_id')
            videoObject.save()
            
            return Response(apiResponse(200, "thumbnail updated successfully"), status=status.HTTP_200_OK)
        
        else:
            title = request.data.get('title')
            description = request.data.get('description')
            
            videoObject = Video.getVideoById(videoId)
            
            if title is not None:
                videoObject.title = title
            if description is not None:
                videoObject.description = description
            
            videoObject.save()
            
            return Response(apiResponse(200, "detail updated successfully"), status=status.HTTP_200_OK)
    
    def delete(self, request, videoId):
        videoObject = Video.getVideoById(videoId)
        if videoObject is None:
            return Response(apiError(404, 'Object not found'), status=status.HTTP_404_NOT_FOUND)
        
        response = deleteFromCloudinry(videoObject.video_id)
        if response is None:
            return Response(apiError(500, 'internal server error'), status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        videoObject.delete()
        
        return Response(apiResponse(200, "video remove successfully"), status=status.HTTP_200_OK)