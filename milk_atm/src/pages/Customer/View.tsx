// src/pages/CustomerView.tsx or src/components/CustomerView.tsx

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCustomer } from "../../services/api";
import type { CustomerInterface } from "../../types";
import Loader from "../../components/Loader";
import { Link } from "react-router-dom";



const CustomerView: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [customer, setCustomer] = useState<CustomerInterface | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        fetchCustomer(id).then(res => {
            setCustomer(res);
        }).catch(err => {
            if (err)
                setError("Failed to load customer data:");
        }).finally(() => {
            setLoading(false);
        })
    }, [id]);

    if (loading) return <Loader />;
    if (error || !customer) return <div>{error || "Customer not found."}</div>;

    return (
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="h3 mb-0">Edit Customer</h1>
                        <Link to="/customers" className="btn btn-outline-secondary">
                            Back to Customers
                        </Link>
                    </div>
                    <hr />
                </div>
            </div>
            <div>
                <p><strong>ID:</strong> {customer.enc_id}</p>
                <p><strong>Name:</strong> {customer.first_name} {customer.last_name}</p>
                <p><strong>Phone:</strong> {customer.phone_number}</p>
                {customer.address && <p><strong>Address:</strong> {customer.address}</p>}
            </div>
        </div>
    );
};

export default CustomerView;
