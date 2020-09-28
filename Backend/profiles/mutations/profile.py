import graphene
from graphql_jwt.decorators import login_required
from profiles.models import Profile

class UpdateProfileObj(graphene.ObjectType):
    status = graphene.Boolean()

class UploadFileObj(graphene.ObjectType):
    fileName = graphene.String()

class ProfileDetailsObj(graphene.InputObjectType):
    firstName = graphene.String(required=False)
    lastName = graphene.String(required=False)
    phone = graphene.String(required=False)
    about = graphene.String()

class UpdateProfilePic(graphene.Mutation):
    Output = UploadFileObj

    @login_required
    def mutate(self, info):
        user = info.context.user
        profilePic = info.context.FILES['imageFile']
        profile = Profile.objects.get(user=user)
        profile.profile_pic = profilePic
        profile.save()

        return UploadFileObj(fileName=info.context.build_absolute_uri(profile.profile_pic.url))

class UpdateProfile(graphene.Mutation):
    class Arguments:
        details = ProfileDetailsObj(required=False)

    Output = UpdateProfileObj

    @login_required
    def mutate(self, info, details=None):
        user = info.context.user
        profile = Profile.objects.get(user=user)
        if info.context.FILES is not None :
            if "profilePhoto" in info.context.FILES:
                profilePhoto = info.context.FILES['profilePhoto']
                if profilePhoto is not None:
                    profile.photo = profilePhoto

        if details is not None:
            if details.firstName is not None:
                user.first_name = details.firstName
                user.save()
            if details.lastName is not None:
                user.last_name = details.lastName
                user.save()
            if details.phone is not None:
                profile.phone = details.phone
            if details.about is not None:
                profile.about = details.about
        
        profile.save()
        return UpdateProfileObj(status=True)

class Mutation(graphene.ObjectType):
    updateProfile = UpdateProfile.Field()
    updateProfilePic = UpdateProfilePic.Field()

