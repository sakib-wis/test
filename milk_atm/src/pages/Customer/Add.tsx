

import type React from "react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { createCustomers, fetchCities, fetchStates } from "../../services/api"

export default function AddCustomerPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone_number: "",
        address: "",
        state_id: 1,
        city_id: 1,
        customer_type: "individual",
        preferred_payment_method: "cash",
        delivery_schedule: "morning",
        delivery_frequency: "daily",
        additional_notes: "",
    })
    const [states, setStates] = useState([])
    const [cities, setCities] = useState([])
    const [errors, setErrors] = useState<Record<string, string>>({})

    useEffect(() => {
        fetchStates().then(async res => {
            setStates(await res);
        })
        fetchCities().then(async res => {
            setCities(await res)
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

    const validateForm = () => {
        const newErrors: Record<string, string> = {}

        if (!formData.first_name.trim()) newErrors.first_name = "First name is required"
        if (!formData.last_name.trim()) newErrors.last_name = "Last name is required"
        if (!formData.phone_number.trim()) newErrors.phone_number = "Phone number is required"

        // Address validation
        if (!formData.address.trim()) newErrors.address = "Street address is required"
        if (!formData.city_id) newErrors.city_id = "City is required"
        if (!formData.state_id) newErrors.state_id = "State is required"

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!validateForm()) return

        setIsSubmitting(true)

        try {
            // Simulate API call
            const res = await createCustomers(formData)
            console.log("Repose", res)
            // Redirect to customers list
            navigate("/customers")
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
                        <h1 className="h3 mb-0">Add New Customer</h1>
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
                                        <label htmlFor="first_name" className="form-label">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.first_name ? "is-invalid" : ""}`}
                                            id="first_name"
                                            name="first_name"
                                            value={formData.first_name}
                                            onChange={handleChange}
                                            required placeholder="Enter Value"
                                        />
                                        {errors.first_name && <div className="invalid-feedback">{errors.first_name}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="last_name" className="form-label">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.last_name ? "is-invalid" : ""}`}
                                            id="last_name"
                                            name="last_name"
                                            value={formData.last_name}
                                            onChange={handleChange}
                                            required placeholder="Enter Value"
                                        />
                                        {errors.last_name && <div className="invalid-feedback">{errors.last_name}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="phone_number" className="form-label">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.phone_number ? "is-invalid" : ""}`}
                                            id="phone_number"
                                            name="phone_number"
                                            value={formData.phone_number}
                                            onChange={handleChange}
                                            required placeholder="Enter Value"
                                        />
                                        {errors.phone_number && <div className="invalid-feedback">{errors.phone_number}</div>}
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5 className="card-title mb-3">Address Information</h5>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label htmlFor="address" className="form-label">
                                            Street Address *
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.address ? "is-invalid" : ""}`}
                                            id="address"
                                            name="address"
                                            value={formData.address}
                                            onChange={handleChange}
                                            required placeholder="Enter Value"
                                        />
                                        {errors.address && <div className="invalid-feedback">{errors.address}</div>}
                                    </div>


                                    <div className="col-md-4 mb-3">
                                        <label htmlFor="state" className="form-label">
                                            State *
                                        </label>
                                        <select name="state" id="state" className={`form-control ${errors.state ? "is-invalid" : ""}`} value={formData.state_id}
                                            onChange={handleChange}
                                            required>
                                            {states && states.map(ele => <option value={ele.id} key={ele.id}>{ele.value}</option>
                                            )}
                                        </select>
                                        {errors.state_id && <div className="invalid-feedback">{errors.state_id}</div>}
                                    </div>

                                    <div className="col-md-5 mb-3">
                                        <label htmlFor="city" className="form-label">
                                            City *
                                        </label>
                                        <select name="city" id="city" className={`form-control ${errors.city ? "is-invalid" : ""}`} value={formData.city_id}
                                            onChange={handleChange}
                                            required>
                                            {cities && cities.map(ele => <option value={ele.id} key={ele.id}>{ele.value}</option>
                                            )}
                                        </select>
                                        {errors.city_id && <div className="invalid-feedback">{errors.city_id}</div>}
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5 className="card-title mb-3">Customer Preferences</h5>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="customer_type" className="form-label">
                                            Customer Type
                                        </label>
                                        <select
                                            className="form-select"
                                            id="customer_type"
                                            name="customer_type"
                                            value={formData.customer_type}
                                            onChange={handleChange}
                                        >
                                            <option value="individual">Individual</option>
                                            <option value="business">Business</option>
                                            <option value="reseller">Reseller</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="preferred_payment_method" className="form-label">
                                            Preferred Payment Method
                                        </label>
                                        <select
                                            className="form-select"
                                            id="preferred_payment_method"
                                            name="preferred_payment_method"
                                            value={formData.preferred_payment_method}
                                            onChange={handleChange}
                                        >
                                            <option value="cash">Cash</option>
                                            <option value="online">Online Payment</option>
                                            <option value="credit">Credit Card</option>
                                            <option value="upi">UPI</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="delivery_schedule" className="form-label">
                                            Delivery Schedule
                                        </label>
                                        <select
                                            className="form-select"
                                            id="delivery_schedule"
                                            name="delivery_schedule"
                                            value={formData.delivery_schedule}
                                            onChange={handleChange}
                                        >
                                            <option value="morning">Morning (6AM - 9AM)</option>
                                            <option value="evening">Evening (4PM - 7PM)</option>
                                            <option value="both">Both Morning & Evening</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="delivery_frequency" className="form-label">
                                            Delivery Frequency
                                        </label>
                                        <select
                                            className="form-select"
                                            id="delivery_frequency"
                                            name="delivery_frequency"
                                            value={formData.delivery_frequency}
                                            onChange={handleChange}
                                        >
                                            <option value="daily">Daily</option>
                                            <option value="alternate">Alternate Days</option>
                                            <option value="weekly">Weekly</option>
                                        </select>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label htmlFor="additional_notes" className="form-label">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="additional_notes"
                                            name="additional_notes"
                                            rows={3}
                                            value={formData.additional_notes}
                                            onChange={handleChange}
                                            placeholder="Any special instructions or additional information..."
                                        ></textarea>
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
                                            "Add Customer"
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
