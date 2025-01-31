# Generated by Django 4.1.13 on 2024-11-06 07:45

from django.db import migrations, models
import django.utils.timezone


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='ResetPasswordVerification',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('email', models.EmailField(max_length=254)),
                ('otp', models.CharField(max_length=6)),
                ('created_at', models.DateTimeField(default=django.utils.timezone.now)),
                ('is_verified', models.BooleanField(default=False)),
            ],
        ),
        migrations.AlterField(
            model_name='emailverification',
            name='created_at',
            field=models.DateTimeField(default=django.utils.timezone.now),
        ),
    ]
