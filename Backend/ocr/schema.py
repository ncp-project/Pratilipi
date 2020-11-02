import graphene
from ocr.mutations.ocr import Mutation as OCRMutations

class Mutation(OCRMutations,graphene.ObjectType):
    pass