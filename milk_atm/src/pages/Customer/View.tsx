// src/pages/CustomerView.tsx or src/components/CustomerView.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fetchCustomer } from "../../services/api";

interface Customer {
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

const CustomerView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<Customer | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {        
        fetchCustomer(id).then(res => {
            setCustomer(res);
        }).catch(err => {
            setError("Failed to load customer data:", err);
        }).finally(res => {
            console.log(">res", res)
            setLoading(false);
        })
    }, [id]);

    if (loading) return <div>Loading...</div>;
    if (error || !customer) return <div>{error || "Customer not found."}</div>;

    return (
        <div>
            <h2>Customer Details</h2>
            <p><strong>ID:</strong> {customer.enc_id}</p>
            <p><strong>Name:</strong> {customer.first_name} {customer.last_name}</p>
            <p><strong>Phone:</strong> {customer.phone_number}</p>
            {customer.address && <p><strong>Address:</strong> {customer.address}</p>}
        </div>
    );
};

export default CustomerView;
