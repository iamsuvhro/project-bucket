# Generated by Django 3.2.15 on 2022-11-03 18:44

from django.db import migrations, models
import uuid


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_alter_user_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='user_id',
            field=models.UUIDField(default=uuid.UUID('94fed216-5ba7-11ed-9da8-7f94e8bff6aa'), primary_key=True, serialize=False),
        ),
    ]