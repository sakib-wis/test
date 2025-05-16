import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net';
interface Customer {
    id: number;
    name: string;
    phone_number: string;
    address: string;
}

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [form, setForm] = useState<Omit<Customer, 'id'>>({ name: '', phone_number: '', address: '' });
    const tableRef = useRef<HTMLTableElement>(null);
    const handleAdd = () => {
        const newCustomer: Customer = {
            id: Date.now(),
            ...form,
        };
        setCustomers([...customers, newCustomer]);
        setForm({ name: '', phone_number: '', address: '' });
    };
    useEffect(() => {
        if (tableRef.current) {
            // Initialize DataTables
            // const table = $(tableRef.current).DataTable();

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
                                        <tr>
                                            <td>John Doe</td>
                                            <td>+1 234-567-8901</td>
                                            <td>123 Main St, Anytown</td>
                                            <td>Individual</td>
                                            <td>Morning (Daily)</td>
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
                                        </tr>
                                        <tr>
                                            <td>Jane Smith</td>
                                            <td>+1 987-654-3210</td>
                                            <td>456 Oak Ave, Somewhere</td>
                                            <td>Business</td>
                                            <td>Evening (Daily)</td>
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
                                        </tr>
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
