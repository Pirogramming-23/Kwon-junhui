# review/forms.py

from django import forms
from .models import Review

class ReviewForm(forms.ModelForm):
    class Meta:
        model = Review
        fields = ['title', 'director', 'actor', 'year', 'genre', 'running_time', 'rating']
