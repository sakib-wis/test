

import type React from "react"
import { useEffect, useState } from "react"
import { Link, useNavigate } from 'react-router-dom'
import { createCustomers, fetchCities, fetchStates } from "../../services/api"

export default function AddCustomerPage() {
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        phone: "",
        streetAddress: "",
        state_id: 1,
        city_id: 1,
        customerType: "individual",
        paymentMethod: "cash",
        deliverySchedule: "morning",
        deliveryFrequency: "daily",
        notes: "",
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

        if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
        if (!formData.phone.trim()) newErrors.phone = "Phone number is required"

        // Address validation
        if (!formData.streetAddress.trim()) newErrors.streetAddress = "Street address is required"
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
                                        <label htmlFor="firstName" className="form-label">
                                            First Name *
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.firstName ? "is-invalid" : ""}`}
                                            id="firstName"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            required placeholder="Enter Value"
                                        />
                                        {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="lastName" className="form-label">
                                            Last Name *
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.lastName ? "is-invalid" : ""}`}
                                            id="lastName"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            required placeholder="Enter Value"
                                        />
                                        {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="phone" className="form-label">
                                            Phone Number *
                                        </label>
                                        <input
                                            type="tel"
                                            className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            required placeholder="Enter Value"
                                        />
                                        {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
                                    </div>
                                </div>

                                <div className="row mb-4">
                                    <div className="col-12">
                                        <h5 className="card-title mb-3">Address Information</h5>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label htmlFor="streetAddress" className="form-label">
                                            Street Address *
                                        </label>
                                        <input
                                            type="text"
                                            className={`form-control ${errors.streetAddress ? "is-invalid" : ""}`}
                                            id="streetAddress"
                                            name="streetAddress"
                                            value={formData.streetAddress}
                                            onChange={handleChange}
                                            required placeholder="Enter Value"
                                        />
                                        {errors.streetAddress && <div className="invalid-feedback">{errors.streetAddress}</div>}
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
                                        <label htmlFor="customerType" className="form-label">
                                            Customer Type
                                        </label>
                                        <select
                                            className="form-select"
                                            id="customerType"
                                            name="customerType"
                                            value={formData.customerType}
                                            onChange={handleChange}
                                        >
                                            <option value="individual">Individual</option>
                                            <option value="business">Business</option>
                                            <option value="reseller">Reseller</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="paymentMethod" className="form-label">
                                            Preferred Payment Method
                                        </label>
                                        <select
                                            className="form-select"
                                            id="paymentMethod"
                                            name="paymentMethod"
                                            value={formData.paymentMethod}
                                            onChange={handleChange}
                                        >
                                            <option value="cash">Cash</option>
                                            <option value="online">Online Payment</option>
                                            <option value="credit">Credit Card</option>
                                            <option value="upi">UPI</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="deliverySchedule" className="form-label">
                                            Delivery Schedule
                                        </label>
                                        <select
                                            className="form-select"
                                            id="deliverySchedule"
                                            name="deliverySchedule"
                                            value={formData.deliverySchedule}
                                            onChange={handleChange}
                                        >
                                            <option value="morning">Morning (6AM - 9AM)</option>
                                            <option value="evening">Evening (4PM - 7PM)</option>
                                            <option value="both">Both Morning & Evening</option>
                                        </select>
                                    </div>

                                    <div className="col-md-6 mb-3">
                                        <label htmlFor="deliveryFrequency" className="form-label">
                                            Delivery Frequency
                                        </label>
                                        <select
                                            className="form-select"
                                            id="deliveryFrequency"
                                            name="deliveryFrequency"
                                            value={formData.deliveryFrequency}
                                            onChange={handleChange}
                                        >
                                            <option value="daily">Daily</option>
                                            <option value="alternate">Alternate Days</option>
                                            <option value="weekly">Weekly</option>
                                        </select>
                                    </div>

                                    <div className="col-12 mb-3">
                                        <label htmlFor="notes" className="form-label">
                                            Additional Notes
                                        </label>
                                        <textarea
                                            className="form-control"
                                            id="notes"
                                            name="notes"
                                            rows={3}
                                            value={formData.notes}
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
