import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import $ from 'jquery';
import 'datatables.net-dt/css/dataTables.dataTables.min.css';
import 'datatables.net';
import { deleteCustomers, fetchCustomers } from '../services/api';
import type { CustomerInterface } from '../types';
import Loader from '../components/Loader';
import Swal from 'sweetalert2';

const Customers: React.FC = () => {
    const navigate = useNavigate();
    const [customers, setCustomers] = useState<CustomerInterface[]>([]);
    const tableRef = useRef<HTMLTableElement>(null);
    const tableInitialized = useRef<boolean>(false);
    const [loading, setLoading] = useState<boolean>(true);

    // Fetch customer data
    useEffect(() => {
        loadCustomers()
    }, []);
    const loadCustomers = () => {
        fetchCustomers().then(res => {
            setCustomers(res);
        }).finally(() => {
            setLoading(false);
        });
    }
    // Initialize DataTables after data is loaded
    useEffect(() => {
        if (customers.length > 0 && tableRef.current && !tableInitialized.current) {
            $(tableRef.current).DataTable({
                // responsive: true,
            });
            tableInitialized.current = true;
        }

        return () => {
            if (tableRef.current && $.fn.dataTable.isDataTable(tableRef.current)) {
                // $(tableRef.current).DataTable().destroy(true);
                // tableInitialized.current = false;
            }
        };
    }, [customers]);
    const deleteCustomer = async (enc_id: string) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This action cannot be undone!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        });

        if (result.isConfirmed) {
            setLoading(true)
            deleteCustomers(enc_id).then(() => {
                Swal.fire('Deleted!', 'The item has been deleted.', 'success');
                loadCustomers()
            }).finally(() => {
                setLoading(false);
            })
        }
    }
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
                {loading ? <Loader /> : <div className="col-12">
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
                                                        <button className="btn btn-outline-danger" onClick={() => deleteCustomer(ele.enc_id)}>
                                                            Delete
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
                </div>}
            </div>
        </div>
    );
};

export default Customers;
