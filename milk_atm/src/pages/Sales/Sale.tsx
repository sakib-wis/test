

import type React from "react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { fetchAdminPanel, fetchCustomers, milkSold } from "../../services/api";
import { milk_types_options, type AdminPanelInterface, type CustomerInterface, type SaleMilkInterface, type CustomerOption } from "../../types";
import { formatCurrency } from '../../utils/helpers'
import Loader from "../../components/Loader";
import { toast } from "react-toastify";
import Select, { type SingleValue } from 'react-select'
export default function SaleMilk() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [customers, setCustomers] = useState<CustomerOption[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [adminPanel, setAdminPanel] = useState<AdminPanelInterface>({
        cow_milk_rate: 0,
        buffalo_milk_rate: 0,
        mix_milk_rate: 0
    });
    const [formData, setFormData] = useState<SaleMilkInterface>({
        customer: "",
        milk_type: '',
        quantity: "",
        payment_method: 'cash',
        price: 0,
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        fetchCustomers().then(res => {
            setCustomers(res.map((customer: CustomerInterface) => ({ label: `${customer.first_name} ${customer.last_name}`, value: customer.id })));
            if (res[0]?.id) {
                setFormData((prev) => ({ ...prev, customer: res[0].id.toString() }));
            }
        }).finally(() => {
            setLoading(false);
        })
        fetchAdminPanel().then(res => {
            setAdminPanel(res);
            const defaultMilkType = milk_types_options[0];
            if (defaultMilkType) {
                setFormData((prev) => ({ ...prev, milk_type: defaultMilkType.id.toString() }));
            }
        }).finally(() => {
            setLoading(false);
        })
    }, [])
    useEffect(() => {
        const quantity = parseFloat(formData.quantity);
        if (!quantity || isNaN(quantity)) {
            setFormData((prev) => ({ ...prev, price: 0 }));
            return;
        }
        let rate: number = 0;
        switch (formData.milk_type) {
            case '1':
                rate = adminPanel.mix_milk_rate;
                break;
            case '2':
                rate = adminPanel.buffalo_milk_rate;
                break;
            case '3':
                rate = adminPanel.cow_milk_rate;
                break;
            default:
                rate = 0;
        }
        if (rate) {
            setFormData((prev) => ({ ...prev, price: 0 }));
            const calculatedPrice = quantity * rate;
            setFormData((prev) => ({
                ...prev,
                price: parseFloat(calculatedPrice.toFixed(2))
            }));
        }
    }, [formData.quantity, formData.milk_type, adminPanel]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))

        // Clear error when field is edited
        if (errors[name]) {
            setErrors((prev) => {
                const newErrors = { ...prev }
                delete newErrors[name]
                return newErrors
            })
        }
    }
    const handleSelectChange = (
        selectedOption: SingleValue<{ label: string; value: string }>
    ) => {
        if (selectedOption) {
            setFormData((prev) => ({
                ...prev,
                customer: selectedOption.value,
            }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.customer) newErrors.customer = "Customer is required"
        if (!formData.milk_type) newErrors.price = "Milk Type is required"
        if (!formData.quantity) newErrors.quantity = "Quantity is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            await milkSold(formData)
            toast.success("Milk sold successfully!")
            navigate("/sales")
        } catch (error) {
            toast.error("Failed to sell milk. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }
    return (
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="h3 mb-0">Add Sale</h1>
                        <Link to="/sales" className="btn btn-outline-secondary">
                            Back to Sales
                        </Link>
                    </div>
                    <hr />
                </div>
            </div>

            <div className="row">
                {
                    loading ? <Loader /> : <div className="col-lg-10 col-xl-8 mx-auto">
                        <div className="card border-0 shadow-sm">
                            <div className="d-flex justify-content-between align-items-center card-header bg-white border-bottom">
                                <h6>Cow Rate: {formatCurrency(adminPanel.cow_milk_rate)}</h6>
                                <h6>Buffalow Rate: {formatCurrency(adminPanel.buffalo_milk_rate)}</h6>
                                <h6>Mix Rate: {formatCurrency(adminPanel.mix_milk_rate)}</h6>
                            </div>
                            <div className="card-body p-4">
                                <form onSubmit={handleSubmit} noValidate>
                                    <div className="row mb-4">
                                        <div className="col-12">
                                            <h5 className="card-title mb-3">Personal Information</h5>
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="customer" className="form-label">
                                                Customer *
                                            </label>
                                            <Select options={customers} className={`${errors.customer ? "is-invalid" : ""}`}
                                                id="customer"
                                                name="customer"
                                                value={customers.find((c) => c.value === formData.customer) || null}
                                                onChange={handleSelectChange}
                                                required />
                                            {/* <select
                                                className={`form-control ${errors.customer ? "is-invalid" : ""}`}
                                                id="customer"
                                                name="customer"
                                                value={formData.customer}
                                                onChange={handleChange}
                                                required>
                                                {customers && customers.map(customer => <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>)}
                                            </select> */}
                                            {errors.customer && <div className="invalid-feedback">{errors.customer}</div>}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="milk_type" className="form-label">
                                                Milk Type *
                                            </label>
                                            <select
                                                className={`form-control ${errors.milk_type ? "is-invalid" : ""}`}
                                                id="milk_type"
                                                name="milk_type"
                                                value={formData.milk_type}
                                                onChange={handleChange}
                                                required>
                                                {milk_types_options && milk_types_options.map(milk_type => <option key={milk_type.id} value={milk_type.id}>{milk_type.value}</option>)}
                                            </select>
                                            {errors.milk_type && <div className="invalid-feedback">{errors.milk_type}</div>}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="quantity" className="form-label">
                                                Quantity (in L.) *
                                            </label>
                                            <input
                                                type="number"
                                                className={`form-control ${errors.quantity ? "is-invalid" : ""}`}
                                                id="quantity"
                                                name="quantity"
                                                value={formData.quantity}
                                                onChange={handleChange}
                                                required placeholder="Enter Value"
                                            />
                                            {errors.quantity && <div className="invalid-feedback">{errors.quantity}</div>}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="payment_method" className="form-label">
                                                Payment Method
                                            </label>
                                            <select className={`form-control ${errors.payment_method ? "is-invalid" : ""}`}
                                                id="payment_method"
                                                name="payment_method"
                                                value={formData.payment_method}
                                                onChange={handleChange}
                                                required                                            >
                                                <option value="cash">Cash</option>
                                                <option value="online">Online</option>

                                            </select>
                                            {errors.payment_method && <div className="invalid-feedback">{errors.payment_method}</div>}
                                        </div>
                                        <div className="col-md-6 mb-3">
                                            <label htmlFor="price" className="form-label">
                                                Price *
                                            </label>
                                            <input type="number"
                                                className="form-control"
                                                id="price"
                                                name="price"
                                                value={formData.price}
                                                onChange={handleChange}
                                                required disabled />
                                        </div>
                                    </div>
                                    <div className="d-grid gap-2 d-md-flex justify-content-md-end">
                                        <Link to="/customers" className="btn btn-outline-secondary me-md-2">
                                            Cancel
                                        </Link>
                                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                                            {isSubmitting ? (
                                                <>
                                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                                    Saving...
                                                </>
                                            ) : (
                                                "Sold Milk"
                                            )}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                }
            </div>
        </div>
    )
}
