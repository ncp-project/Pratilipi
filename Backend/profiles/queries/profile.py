
import graphene
from graphql_jwt.decorators import login_required
from profiles.models import Profile

class ProfileObj(graphene.ObjectType):
    username = graphene.String()
    firstName = graphene.String()
    lastName = graphene.String()
    email = graphene.String()
    phone = graphene.String()
    about = graphene.String()
    profilePic = graphene.String()

    def resolve_profilePic(self, info):
        if self.profile_pic and hasattr(self.profile_pic, 'url'):
            return info.context.build_absolute_uri(self.profile_pic.url)
        return None
    
    def resolve_firstName(self, info):
        return self.user.first_name

    def resolve_lastName(self, info):
        return self.user.last_name

    def resolve_email(self, info):
        return self.user.email

    def resolve_username(self, info):
        return self.user.username


class Query(object):
    myProfile = graphene.Field(ProfileObj)

    @login_required
    def resolve_myProfile(self, info, **kwargs):
        user = info.context.user
        if user.id:
            return Profile.objects.get(user=user)
        return None