from django.contrib.auth.models import User


class EmailAuthBackend(object):
    """
    Uwierzytelnianie użytkownika na podstawie adresu e-mail.
    """
    def authenticate(self, requeset, username=None, password=None):
        try:
            user = User.objects.get(email=username)
            if user.check_password(password):
                return User
            return None
        except User.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return User.objects.get(pk=user_id)
        except:
            return None