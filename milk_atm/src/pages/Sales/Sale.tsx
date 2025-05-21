

import type React from "react"
import { useEffect, useMemo, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { fetchCustomers, milkSold } from "../../services/api";
export interface CustomerInterface {
    id: number;
    enc_id: string | null;
    first_name: string | null;
    last_name: string | null;
    phone_number: string | null;
    address: string | null;
    customer_type: string | null;
    preferred_payment_method: string | null;
    delivery_schedule: string | null;
    delivery_frequency: string | null;
    additional_notes: string | null;
    city: number | null;
    state: number | null;
}
export default function SaleMilk() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [customers, setCustomers] = useState<CustomerInterface[]>([]);
    const [formData, setFormData] = useState({
        customer: "",
        quantity: "",
        price: 0,
    })
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        fetchCustomers().then(res => {
            setCustomers(res);
        })
    }, [])
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
    const handelPriceChange = useMemo(() => {
        setFormData((prev) => ({
            ...prev,
            price: formData.price + 100
        }))
    }, [formData.quantity])
    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.customer.trim()) newErrors.customer = "Customer is required"
        if (!formData.quantity) newErrors.price = "Quantity is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            const res = await milkSold(formData)
            console.log(">Sa", res)
            // Simulate API call            
            navigate("/sales")
        } catch (error) {
            console.error("Error adding customer:", error)
            alert("Failed to add customer. Please try again.")
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
                        <Link to="/customers" className="btn btn-outline-secondary">
                            Back to Customers
                        </Link>
                    </div>
                    <hr />
                </div>
            </div>

            <div className="row">
                <div className="col-lg-10 col-xl-8 mx-auto">
                    <div className="card border-0 shadow-sm">
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
                                        <select
                                            className={`form-control ${errors.customer ? "is-invalid" : ""}`}
                                            id="customer"
                                            name="customer"
                                            value={formData.customer}
                                            onChange={handleChange}
                                            required>
                                            {customers && customers.map(customer => <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>)}
                                        </select>
                                        {errors.customer && <div className="invalid-feedback">{errors.customer}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="quantity" className="form-label">
                                            Quantity (in Kg.) *
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
                                        <label htmlFor="price" className="form-label">
                                            Price *
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.price ? "is-invalid" : ""}`}
                                            id="price"
                                            name="price"
                                            value={formData.price}
                                            disabled
                                            required placeholder="Enter Value"
                                        />
                                        {errors.price && <div className="invalid-feedback">{errors.price}</div>}
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
            </div>
        </div>
    )
}
