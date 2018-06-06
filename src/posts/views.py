from rest_framework import generics, permissions


from .models import Post
from .permissions import IsOwnerOrReadOnly
from .serializers import PostSerializer



class PostDetailAPIView(generics.RetrieveUpdateDestroyAPIView):
    queryset            = Post.objects.all()
    serializer_class    = PostSerializer
    lookup_field        = 'slug'
    permission_classes  = [IsOwnerOrReadOnly]

    # def get_serializer_context(self):
    #     context = super().get_serializer_context()
    #     context['request'] = self.request
    #     return context


class PostListCreateAPIView(generics.ListCreateAPIView):
    queryset            = Post.objects.all()
    serializer_class    = PostSerializer
    permission_classes  = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


