from django import forms
from .models import Idea

class IdeaForm(forms.ModelForm):
    class Meta:
        model = Idea
        fields = ['title', 'image', 'description', 'level', 'tool']
        labels = {
            'title': '아이디어명',
            'image': '이미지',
            'description': '아이디어 설명',
            'level': '아이디어 관심도',
            'tool': '예상 개발툴',
        }
