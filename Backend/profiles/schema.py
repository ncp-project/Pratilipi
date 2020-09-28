import graphene
from profiles.mutations.profile import Mutation as ProfileMutations
from profiles.queries.profile import Query as ProfileQueries


class Mutation(ProfileMutations,graphene.ObjectType):
    pass

class Query(ProfileQueries,graphene.ObjectType):
    pass