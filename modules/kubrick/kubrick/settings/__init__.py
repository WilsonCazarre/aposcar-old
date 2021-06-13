import os
import django.core.exceptions

from dotenv import load_dotenv

load_dotenv()

try:
    is_dev = os.environ["DJANGO_ENVIRONMENT"] == "dev"
except KeyError:
    raise django.core.exceptions.ImproperlyConfigured(
        'DJANGO_ENVIRONMENT variable must be set to either "dev" or "prod" '
        "in the current environment"
    )

if os.environ["DJANGO_ENVIRONMENT"] == "dev":
    from .dev import *
elif os.environ['DJANGO_ENVIRONMENT'] == 'test':
    from .tests import *
elif os.environ['DJANGO_ENVIRONMENT'] == 'prod':
    from .prod import *
