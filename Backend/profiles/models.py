from django.db import models
from django.contrib.auth.models import User
from ckeditor.fields import RichTextField
from django.db.models.signals import post_save
from django.db.models.signals import post_delete
from django.dispatch import receiver

import uuid

# Create your models here.


class Profile(models.Model):
    
    def get_profile_pic_path(self, filename):
        ext = filename.split('.')[-1]
        filename = "%s.%s" % (uuid.uuid4(), ext)
        return 'uploads/images/profile_pic/' + filename

    user = models.OneToOneField(
                User, on_delete=models.CASCADE,
                related_name='Profile',
                verbose_name='User',
    )
    phone = models.CharField(max_length=12, blank=True, null=True)
    about = RichTextField(max_length=1000, null=True, blank=True)
    profile_pic = models.ImageField(default='default.png', upload_to=get_profile_pic_path, null=True, blank=True)

    def __str__(self):
        return self.user.username

@receiver(post_save, sender=User)
def create_item(sender, instance, **kwargs):
    p, created = Profile.objects.get_or_create(user=instance)
    p.save()

@receiver(post_delete, sender=Profile)
def submission_delete(sender, instance, **kwargs):
    instance.profile_pic.delete(False)