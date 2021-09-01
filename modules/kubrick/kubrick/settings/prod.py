from .common import *

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

CORS_ALLOW_ALL_ORIGINS = False
CORS_ORIGIN_WHITELIST = ["https://aposcar.games", "http://localhost:3000"]


ADMINS = [("Wilson Cazarré", "labqu4tro@gmail.com")]

ALLOWED_HOSTS = [
    ".aposcar.games",
    "localhost",
]

# Redirect all HTTP request do HTTPS
# See https://docs.djangoproject.com/en/3.1/ref/settings/#secure-ssl-redirect
SECURE_SSL_REDIRECT = True


# Database
# https://docs.djangoproject.com/en/3.1/ref/settings/#databases

# We're using Heroku to manage our database in prod
# POSTGRES_DATABASE = {
#     'ENGINE': 'django.db.backends.postgresql',
#     'NAME': os.getenv('DATABASE_NAME'),
#     'USER': os.getenv('DATABASE_USER'),
#     'PASSWORD': os.getenv('DATABASE_PASSWORD'),
#     'HOST': os.getenv('DATABASE_HOST'),
#     'PORT': os.getenv('DATABASE_PORT')
# }

DATABASES = {}

# Email settings
EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_HOST_USER = os.getenv("EMAIL_HOST_USER")
EMAIL_HOST_PASSWORD = os.getenv("EMAIL_HOST_PASSWORD")
EMAIL_PORT = 587
EMAIL_USE_TLS = True

DEFAULT_FILE_STORAGE = "storages.backends.azure_storage.AzureStorage"

# Azure Storage Settings
AZURE_CONNECTION_STRING = str(os.getenv("AZURE_CONNECTION_STRING"))
AZURE_CONTAINER = str(os.getenv("AZURE_CONTAINER"))


CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = False

LOGGING = {
    "version": 1,
    "disable_existing_loggers": False,
    "formatters": {
        "verbose": {
            "format": (
                "%(asctime)s [%(process)d] [%(levelname)s] "
                + "pathname=%(pathname)s lineno=%(lineno)s "
                + "funcname=%(funcName)s %(message)s"
            ),
            "datefmt": "%Y-%m-%d %H:%M:%S",
        },
        "simple": {"format": "%(levelname)s %(message)s"},
    },
    "handlers": {
        "null": {
            "level": "DEBUG",
            "class": "logging.NullHandler",
        },
        "console": {
            "level": "DEBUG",
            "class": "logging.StreamHandler",
            "formatter": "verbose",
        },
    },
    "loggers": {
        "testlogger": {
            "handlers": ["console"],
            "level": "INFO",
        }
    },
}

# Calling heroku settings only on Heroku environment
if "I_AM_HEROKU" in os.environ:
    # Configure Django App for Heroku.
    import django_heroku

    django_heroku.settings(locals(), logging=False)
