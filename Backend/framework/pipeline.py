import requests
from django.core.files import File
from django.core.files.temp import NamedTemporaryFile
from profiles.models import Profile

def get_avatar(backend, user, response, *args, **kwargs):
    provider = backend.name 
    if provider == 'google-oauth2':
        r = requests.get(response['picture'])
        img_temp = NamedTemporaryFile(delete=True)
        img_temp.write(r.content)
        img_temp.flush()
        profile,c = Profile.objects.get_or_create(user=user)
        profile.profile_pic.save("image.jpg", File(img_temp), save=True)
