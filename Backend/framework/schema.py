import graphene
import graphql_social_auth
import graphql_jwt
from django.contrib.auth.models import User
from graphql_jwt.shortcuts import get_token, get_refresh_token, create_refresh_token
from profiles.schema import Query as ProfileQueries, Mutation as ProfileMutations
from profiles.schema import Query as ProfileQueries, Mutation as ProfileMutations
from ocr.schema import Mutation as OCRMutations

class StatusObj(graphene.ObjectType):
    googleSignIn = graphene.Boolean()

class UserType(graphene.ObjectType):
    username = graphene.Field(graphene.String)

class SocialAuth(graphql_social_auth.SocialAuthJWT):
    user = graphene.Field(UserType)
    token = graphene.String()

    @classmethod
    def resolve(cls, root, info, social, **kwargs):
        return cls(user=social.user, token=get_token(social.user))

class Query( 
    ProfileQueries,
    graphene.ObjectType
):
    status = graphene.Field(StatusObj)

    @staticmethod
    def resolve_status(self, info, **kwargs):
        return StatusObj(googleSignIn=True)

class Mutation(
    ProfileMutations,
    OCRMutations,
    graphene.ObjectType
):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()
    social_auth = SocialAuth.Field()

schema=graphene.Schema(mutation=Mutation, query=Query)