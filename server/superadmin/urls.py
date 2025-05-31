from django.urls import path
from .views import *
app_name = 'superadmin'

urlpatterns = [
    path('', Dashboard.as_view(), name='dashboard'),
    path('manage-rates', ManageRates.as_view(), name='manage_rates'),
    path('edit-rates', EditRates.as_view(), name='edit_rates'),
    path('manage-states', ManageStates.as_view(), name='manage_states'),
    path('add-states', AddStatesView.as_view(), name='add_states'),
    path('edit-state/<str:enc_id>', EditStatesView.as_view(), name='edit_state'),
    path('delete-state/<str:enc_id>',
         DeleteStatesView.as_view(), name='delete_state'),
    path('manage-cities', ManageCities.as_view(), name='manage_cities'),
    path('add-cities', AddCitiesView.as_view(), name='add_cities'),
    path('edit-city/<str:enc_id>', EditCitiesView.as_view(), name='edit_city'),
    path('delete-city/<str:enc_id>',
         DeleteCitiesView.as_view(), name='delete_city'),
    path('api/admin-panel/', AdminPanelView.as_view(), name='admin_panel'),
]
