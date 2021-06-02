from django.core.files import File
from rest_framework.test import APITestCase

from apps.awards import models


class CategoryTest(APITestCase):
    def setUp(self) -> None:
        models.Category.objects.create(name='Best Picture')
        models.Category.objects.create(name='Best Sound Score')

    def test_category_name(self):
        best_picture = models.Category.objects.get(name='Best Picture')
        best_sound_score = models.Category.objects.get(name='Best Sound Score')

        self.assertEqual(str(best_picture), 'Best Picture')
        self.assertEqual(str(best_sound_score), 'Best Sound Score')


class NomineeTest(APITestCase):
    def setUp(self) -> None:
        with open('./media/nominees/megamind.jpg', 'rb') as img:
            models.Nominee.objects.create(
                name='Megamind',
                picture_url=File(img),
                description='''
                A supervillain named Megamind defeats and kills his enemy. 
                Out of boredom he creates a superhero who becomes evil, 
                forcing Megamind to turn into a hero.
                '''
            )

    def test_nominee_creation(self):
        nominee = models.Nominee.objects.get(name='Megamind')
        self.assertEqual(str(nominee), 'Megamind')


class IndicationTest(APITestCase):
    def setUp(self) -> None:
        self.data = {
            'nominated_name': 'Megamind',
            'picture_path': './media/nominees/megamind.jpg',
            'category_name': 'Best Picture',
            'description': 'Foo',
            'annotation': 'Director: Todd Philips'
        }
        category = models.Category.objects.create(
            name=self.data['category_name']
        )
        with open(self.data['picture_path'], 'rb') as img:
            nominee = models.Nominee.objects.create(
                name=self.data['nominated_name'],
                picture_url=File(img),
                description=self.data['description']
            )

        models.Indication.objects.create(
            nominated=nominee,
            category=category,
            year=2020,
            annotation=self.data['annotation']
        )

    def test_indication_creation(self):
        nominee = models.Nominee.objects.get(name=self.data['nominated_name'])
        indication = models.Indication.objects.get(
            nominated=nominee
        )
        self.assertEqual(
            str(indication),
            f'"{self.data["nominated_name"]}" on "{self.data["category_name"]}"'
        )