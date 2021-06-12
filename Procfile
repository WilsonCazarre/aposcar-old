release: cd modules/kubrick && python manage.py migrate && python manage.py loaddata initial_data/*
web: cd modules/kubrick && gunicorn kubrick.wsgi