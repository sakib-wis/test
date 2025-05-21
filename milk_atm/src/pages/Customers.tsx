import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net';
import { fetchCustomers } from '../services/api';
import type { CustomerInterface } from './Sales/Sale';

const Customers: React.FC = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<CustomerInterface[]>([]);
    const tableRef = useRef<HTMLTableElement>(null);
    const tableInitialized = useRef<boolean>(false);

    // Fetch customer data
    useEffect(() => {
        fetchCustomers().then(res => {
            setCustomers(res);
        });
    }, []);

    // Initialize DataTables after data is loaded
    useEffect(() => {
        if (customers.length > 0 && tableRef.current && !tableInitialized.current) {
            $(tableRef.current).DataTable();
            tableInitialized.current = true;
        }

        return () => {
            if (tableRef.current && $.fn.dataTable.isDataTable(tableRef.current)) {
                // $(tableRef.current).DataTable().destroy(true);
                // tableInitialized.current = false;
            }
        };
    }, [customers]);

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
                                        {customers.map(ele => (
                                            <tr key={ele.id}>
                                                <td>{ele.first_name} {ele.last_name}</td>
                                                <td>{ele.phone_number}</td>
                                                <td>{ele.address}</td>
                                                <td>{ele.customer_type}</td>
                                                <td>{ele.delivery_schedule}</td>
                                                <td>
                                                    <div className="btn-group btn-group-sm">
                                                        <button onClick={() => navigate('/customers/' + ele.enc_id)} className="btn btn-outline-primary">
                                                            View
                                                        </button>
                                                        <button className="btn btn-outline-secondary" onClick={() => navigate('/customers/edit/' + ele.enc_id)}>
                                                            Edit
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
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
