from functools import wraps
from django.conf import settings


def disable_signal(signal_handler):
    """
        Decorator that turns off signal handlers when loading fixture data.
    """
    @wraps(signal_handler)
    def wrapper(*args, **kwargs):
        if 'raw' in kwargs and kwargs.get('raw'):
            return
        return signal_handler(*args, **kwargs)
    return wrapper


def encrypt_secret_key(plain_text):
    trans_str = ''
    for word in plain_text:
        trans_str += str(ord(word)+3)+'S'
    return trans_str.strip('S')


def encrypt_msg(plain_text):
    ENCRYPTION_SECRECT_KEY = settings.ENCRYPTION_SECRECT_KEY
    public_key = encrypt_secret_key(ENCRYPTION_SECRECT_KEY)
    trans_str = ''
    for word in str(plain_text):
        trans_str += str(ord(word)+3)+'M'
    return public_key+trans_str.strip('M')
