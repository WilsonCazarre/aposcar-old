from django.db import IntegrityError
from django.test import TestCase
from rest_framework.authtoken.models import Token

from apps.users import models


class UserTest(TestCase):
    def setUp(self) -> None:
        self.users = [
            {
                'username': 'Dummy1',
                'email': 'dummy1@wonderland.com',
                'password': 'pass',
                'is_staff': True
            },
            {
                'username': 'Dummy2',
                'email': 'dummy2@wonderland.com',
                'password': 'pass',
            },
            {
                'username': 'Dummy3',
                'email': 'dummy3@wonderland.com',
                'password': 'pass',
            }
        ]
        for user in self.users:
            models.UserProfile.objects.create_user(**user)

    def test_user_creation(self):
        for user in self.users:
            user_model = models.UserProfile.objects.get(
                username=user['username']
            )
            self.assertEqual(str(user_model), user['username'])

    def test_create_user_with_existing_email(self):
        with self.assertRaises(IntegrityError):
            models.UserProfile.objects.create(
                username='Dummy4',
                email='dummy1@wonderland.com',
                password='pass'
            )

    def test_create_user_with_existing_username(self):
        with self.assertRaises(IntegrityError):
            models.UserProfile.objects.create(
                username='Dummy1',
                email='dummy5@wonderland.com',
                password='pass'
            )

    def test_token_creation(self):
        # Checks if the signal for Token creation is being triggered
        for user in self.users:
            try:
                Token.objects.get(user__username=user['username'])
            except Token.DoesNotExist:
                self.fail(f'Token does not exist for user {user["username"]}')

    def test_token_is_valid(self):
        # Checks if the token is returning the right user, with the right data.
        for user in self.users:
            user_model = models.UserProfile.objects.get(
                username=user['username']
            )
            token = models.Token.objects.get(user__username=user['username'])
            response = self.client.get(
                '/users/current_user/',
                HTTP_AUTHORIZATION=f'Token {token}'
            )

            self.assertEqual(response.status_code, 200, response.status_text)
            self.assertEqual(user_model.username, user['username'])
            self.assertEqual(user_model.email, user['email'])

    def test_check_staff_value(self):
        # Checks if the is_staff attribute is set to False by default.
        for user in self.users:
            user_model = models.UserProfile.objects.get(
                username=user['username']
            )
            self.assertEqual(
                user_model.is_staff,
                user.get('is_staff', False)
            )