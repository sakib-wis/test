from django import forms
from .models import Customer, Sale


class CustomerForm(forms.ModelForm):
    class Meta:
        model = Customer
        fields = ['name', 'phone', 'address']
        widgets = {
            'address': forms.Textarea(attrs={'rows': 3}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Optionally, customize widget attributes or form labels
        self.fields['name'].widget.attrs.update({'class': 'form-control'})
        self.fields['phone'].widget.attrs.update({'class': 'form-control'})
        self.fields['address'].widget.attrs.update({'class': 'form-control'})


class SaleForm(forms.ModelForm):
    class Meta:
        model = Sale
        fields = ['customer', 'quantity', 'payment_method']
        widgets = {
            'customer': forms.Select(attrs={'class': 'form-select'}),
            'quantity': forms.Select(attrs={'class': 'form-select'}),
            'payment_method': forms.Select(attrs={'class': 'form-select'}),
        }

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        # Optionally, customize widget attributes or form labels
        self.fields['customer'].widget.attrs.update({'class': 'form-select'})
        self.fields['quantity'].widget.attrs.update({'class': 'form-select'})
        self.fields['payment_method'].widget.attrs.update(
            {'class': 'form-select'})

    def clean_quantity(self):
        quantity = self.cleaned_data.get('quantity')
        if quantity not in [0.25, 0.5, 1, 2, 3]:
            raise forms.ValidationError(
                "Invalid quantity. Please select a valid amount.")
        return quantity
