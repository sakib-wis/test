import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net';
import { fetchCustomers } from '../services/api';
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

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const tableRef = useRef<HTMLTableElement>(null);
    useEffect(() => {
        // fetch customers
        fetchCustomers().then(async res => {
            setCustomers(res)
        })
        if (tableRef.current) {
            // Initialize DataTables
            $(tableRef.current).DataTable();

            // // Cleanup on unmount
            // return () => {
            //     table.destroy(true);
            // };
        }
    }, []);
    return (
        <div className="container py-4">
            <div className="row mb-4">
                <div className="col-12">
                    <div className="d-flex justify-content-between align-items-center">
                        <h1 className="h3 mb-0">Customers</h1>
                        <Link to="/customers/add" className="btn btn-primary">
                            Add New Customer
                        </Link>
                    </div>
                    <hr />
                </div>
            </div>

            <div className="row">
                <div className="col-12">
                    <div className="card border-0 shadow-sm">
                        <div className="card-body p-0">
                            <div className="table-responsive">
                                <table ref={tableRef} className="table table-hover mb-0">
                                    <thead className="bg-light">
                                        <tr>
                                            <th scope="col">Name</th>
                                            <th scope="col">Phone</th>
                                            <th scope="col">Address</th>
                                            <th scope="col">Type</th>
                                            <th scope="col">Delivery Schedule</th>
                                            <th scope="col">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {customers && customers.map(ele => <tr key={ele.id}>
                                            <td>{ele.first_name} {ele.last_name}</td>
                                            <td>{ele.phone_number}</td>
                                            <td>{ele.address}</td>
                                            <td>{ele.customer_type}</td>
                                            <td>{ele.delivery_schedule}</td>
                                            <td>
                                                <div className="btn-group btn-group-sm">
                                                    <button type="button" className="btn btn-outline-primary">
                                                        View
                                                    </button>
                                                    <button type="button" className="btn btn-outline-secondary">
                                                        Edit
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>)}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Customers;
