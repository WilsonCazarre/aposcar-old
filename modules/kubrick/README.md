<p align="center">
    <img height=100 src="https://raw.githubusercontent.com/lab-quatro/aposcar/main/aposcar_logo.svg"/>
</p>

<p align="center">
    <strong>Vote and compete with your friends to discover who knows more about the Academy Awards</strong>
</p>

## About this folder
`kubrick` is our REST API built on [Django REST Framework](https://www.django-rest-framework.org/)

## How to run this module

We're using pipenv for this project, make sure to [install it](https://github.com/pypa/pipenv#installation).


1 - Clone the project and navigate to the folder:
```bash
git clone https://github.com/lab-quatro/aposcar.git
cd aposcar\modules\kubrick
```

2 - Create the virtual environment and install the dependencies

```bash
pipenv install
```

3 - Activate the virtual environment

```bash
pipenv shell
```

4 - Create a `.env` file in the module root with the following content (this settings are for development mode):
```dotenv
DJANGO_ENVIRONMENT=dev
SECRET_KEY="your django secret key"
```

5 - Execute the initial schema migrations
```bash
python manage.py migrate
```

6 - Execute the initial data migrations
```
python manage.py loaddata initial_data/*
```

7 - Create your user
```
python manage.py createsuperuser
```

8 - Start the development server
```
python manage.py runserver
```
<hr>
<h6>Made with 💜 by LabQuatro<h6/>

