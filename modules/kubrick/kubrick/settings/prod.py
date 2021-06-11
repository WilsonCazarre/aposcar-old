import os

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = False

CORS_ALLOW_ALL_ORIGINS = False
CORS_ORIGIN_WHITELIST = ['https://aposcar.netlify.app']


ADMINS = [('Wilson Cazarré', 'labqu4tro@gmail.com')]

ALLOWED_HOSTS = ['aposcar.herokuapp.com', 'aposcar.netlify.app']

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

# Email settings
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
EMAIL_PORT = 587
EMAIL_USE_TLS = True

DEFAULT_FILE_STORAGE = 'storages.backends.azure_storage.AzureStorage'

# Azure Storage Settings
AZURE_CONNECTION_STRING = str(os.getenv('AZURE_CONNECTION_STRING'))
AZURE_CONTAINER = str(os.getenv('AZURE_CONTAINER'))


CSRF_COOKIE_SECURE = True
CSRF_COOKIE_HTTPONLY = False

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'handlers': {
        'logfile': {
            'class': 'logging.FileHandler',
            'filename': 'server.log',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['logfile'],
        },
    },
}

# Calling heroku settings only on Heroku environment
if 'I_AM_HEROKU' in os.environ:
    # Configure Django App for Heroku.
    import django_heroku
    django_heroku.settings(locals())
