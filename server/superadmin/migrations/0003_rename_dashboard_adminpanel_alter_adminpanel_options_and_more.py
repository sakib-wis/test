# Generated by Django 5.2.1 on 2025-05-24 08:14

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('superadmin', '0002_rename_mix_mil_rate_dashboard_mix_milk_rate'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Dashboard',
            new_name='AdminPanel',
        ),
        migrations.AlterModelOptions(
            name='adminpanel',
            options={'verbose_name': 'AdminPanel', 'verbose_name_plural': 'AdminPanels'},
        ),
        migrations.AlterModelTable(
            name='adminpanel',
            table='admin_panel',
        ),
    ]
