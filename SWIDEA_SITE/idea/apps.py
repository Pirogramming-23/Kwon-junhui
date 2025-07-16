from django.apps import AppConfig
from django.db.utils import OperationalError, ProgrammingError

class IdeaConfig(AppConfig):
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'idea'

    def ready(self):
        print("앱 시작됨")
        try:
            from .models import Idea
            if not Idea.objects.filter(title='샘플 아이디어', tool='Figma').exists():
                Idea.objects.create(
                    title='샘플 아이디어',
                    level=1,
                    tool='Figma',
                    image='idea_images/sample.jpg',  # 실제 media 폴더 안에 있어야 함
                    description='초기 테스트용 아이디어입니다.'
                )
        except (OperationalError, ProgrammingError):
            # 마이그레이션 전 에러 무시
            pass
