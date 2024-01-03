# Generated by Django 4.2.7 on 2024-01-01 15:11

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('fullname', models.CharField(max_length=50)),
                ('email', models.CharField(max_length=100)),
                ('username', models.CharField(max_length=100)),
                ('avatar', models.ImageField(upload_to='')),
                ('avatar_id', models.CharField(max_length=200)),
                ('password', models.CharField(max_length=500)),
                ('refreshToken', models.CharField(max_length=500)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
            ],
            options={
                'db_table': 'Users',
            },
        ),
    ]