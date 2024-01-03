from dotenv import load_dotenv
import cloudinary.uploader
import cloudinary.api
import cloudinary
import os

load_dotenv()

cloudinary.config(
    cloud_name=os.getenv("CLOUD_NAME"),
    api_key=os.getenv("API_KEY"),
    api_secret=os.getenv("API_SECRET"),
    secure=True,
)

def uploadOnCloudinry(file):
    try:
        result = cloudinary.uploader.upload(
            file,
            folder = "django_avatar",
            resource_type = "auto"
        )
        return result
    except Exception as e:
        return None
    
    
def deleteFromCloudinry(public_id):
    try:
        result = cloudinary.api.delete_resources(
            public_id, 
            resource_type="image", 
            type="upload"
        )
        return result
    except Exception as e:
        return None