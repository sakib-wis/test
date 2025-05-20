import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import { useNavigate } from 'react-router-dom';
import { fetchSales } from '../services/api';
import type { CustomerInterface } from './Sales/Sale';

export interface SaleInterface {
    id: number;
    customer: CustomerInterface;
    quantity: number;
    price: number;
    date: string;
}

const Sales: React.FC = () => {
    const navigate = useNavigate();
    const tableRef = useRef<HTMLTableElement>(null);
    const [sales, setSales] = useState<SaleInterface[]>([]);
    const tableInitialized = useRef<boolean>(false); // prevent multiple initializations

    // Fetch data on mount
    useEffect(() => {
        fetchSales().then(res => {
            setSales(res);
        });
    }, []);

    // Initialize DataTable after sales data is loaded
    useEffect(() => {
        if (sales.length > 0 && tableRef.current && !tableInitialized.current) {
            $(tableRef.current).DataTable();
            tableInitialized.current = true;
        }

        return () => {
            // Cleanup on unmount
            if (tableRef.current && $.fn.dataTable.isDataTable(tableRef.current)) {
                // $(tableRef.current).DataTable().destroy(true);
                // tableInitialized.current = false;
            }
        };
    }, [sales]);

    return (
        <div className="p-6">
            <div className="d-flex justify-content-between">
                <div>
                    <h1 className="text-2xl font-bold mb-4">Milk Sales</h1>
                </div>
                <div>
                    <p>{new Date().toLocaleString()}</p>
                    <button onClick={() => navigate('/sales/sale')} className="btn btn-primary float-end">
                        Add Sale
                    </button>
                </div>
            </div>
            <div className='table-wrapper mt-5'>
                <table className="w-full border display" ref={tableRef}>
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border px-4 py-2">Customer</th>
                            <th className="border px-4 py-2">Qty (L)</th>
                            <th className="border px-4 py-2">Rate</th>
                            <th className="border px-4 py-2">Total</th>
                            <th className="border px-4 py-2">Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sales.map((s) => (
                            <tr key={s.id}>
                                <td className="border px-4 py-2">{s.customer.first_name} {s.customer.last_name}</td>
                                <td className="border px-4 py-2">{s.quantity}</td>
                                <td className="border px-4 py-2">{s.price}</td>
                                <td className="border px-4 py-2">{s.quantity * s.price}</td>
                                <td className="border px-4 py-2">{s.date}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Sales;
