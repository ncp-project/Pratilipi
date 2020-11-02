import graphene
from graphql_jwt.decorators import login_required

class UploadOCRFileObj(graphene.ObjectType):
    fileName = graphene.String()

class UploadOCRFile(graphene.Mutation):
    Output = UploadOCRFileObj

    @login_required
    def mutate(self, info):
        user = info.context.user
        ocrfile = info.context.FILES['File']
        return UploadOCRFileObj(fileName=ocrfile)

class Mutation(graphene.ObjectType):
    uploadOCRFile = UploadOCRFile.Field()