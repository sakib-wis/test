# Generated by Django 5.2.1 on 2025-05-24 08:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Dashboard',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('enc_id', models.CharField(db_index=True, max_length=200, null=True, unique=True)),
                ('start_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('end_date', models.DateTimeField(null=True)),
                ('cow_milk_rate', models.IntegerField(null=True)),
                ('buffalo_milk_rate', models.IntegerField(null=True)),
                ('mix_mil_rate', models.IntegerField(null=True)),
            ],
            options={
                'verbose_name': 'Dashboard',
                'verbose_name_plural': 'Dashboards',
            },
        ),
    ]
