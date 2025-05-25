from django.apps import apps
from django.db.models.signals import post_save
from helpers import helpers


# Generate encrypt id and save in model
# List of your project-specific app names
project_apps = [
    'dairy',
    'superadmin',
]

# Function to handle post_save signal for all models


@helpers.disable_signal
def create_model(sender, instance, created, **kwargs):
    if created:
        instance.enc_id = helpers.encrypt_msg(instance.id)
        instance.save()


# Connect post_save signal to the create function for all models in your project apps
for app_name in project_apps:
    app_config = apps.get_app_config(app_name)
    for model in app_config.get_models():
        post_save.connect(create_model, sender=model)
