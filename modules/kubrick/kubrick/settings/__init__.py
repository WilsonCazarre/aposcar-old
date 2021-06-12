import os
import django.core.exceptions

try:
    is_dev = os.environ["DJANGO_ENVIRONMENT"] == "dev"
except KeyError:
    raise django.core.exceptions.ImproperlyConfigured(
        'DJANGO_ENVIRONMENT variable must be set to either "dev" or "prod" '
        "in the current environment"
    )

if os.environ["DJANGO_ENVIRONMENT"] == "dev":
    from .dev import *
else:
    from .prod import *
