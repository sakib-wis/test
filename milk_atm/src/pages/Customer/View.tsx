// src/pages/CustomerView.tsx or src/components/CustomerView.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fetchCustomer } from "../../services/api";
import type { CustomerInterface } from "../../types";
import Loader from "../../components/Loader";



const CustomerView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<CustomerInterface | null>(null);
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

    if (loading) return <Loader />;
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
