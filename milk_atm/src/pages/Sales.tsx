import React, { useEffect, useRef, useState } from 'react';
import $ from 'jquery';
import 'datatables.net';
import { useNavigate } from 'react-router-dom';
import { fetchSales } from '../services/api';
<<<<<<< HEAD
import type { CustomerInterface } from './Sales/Sale';
=======
>>>>>>> d23d73ea38e4eb1ca0ea170c1bf48902d586e524
import { milk_types_options, type SaleInterface, type TotalInterface } from '../types';
import Loader from '../components/Loader';
import { formatCurrency, getTodayDate } from '../utils/helpers';


const Sales: React.FC = () => {
    const navigate = useNavigate();
    const tableRef = useRef<HTMLTableElement>(null);
    const [sales, setSales] = useState<SaleInterface[]>([]);
    const [total, setTotal] = useState<TotalInterface>({
        total_price: 1200,
        total_quantity: 120
    });
    const tableInitialized = useRef<boolean>(false); // prevent multiple initializations
    const [loading, setLoading] = useState<boolean>(true);
    const [fromDate, setFromDate] = useState(getTodayDate());
    const [toDate, setToDate] = useState(getTodayDate());
    // Fetch data on mount
    useEffect(() => {
        fetchFilteredSales()
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
    const fetchFilteredSales = async () => {
        setLoading(true);
        const payload: any = {
            fromDate,
            toDate
        }
        fetchSales(payload).then(res => {
            setSales(res.data);
            setTotal(res.total)
        }).finally(() => {
            setLoading(false);
            setTimeout(() => {
                if (tableRef.current)
                    $(tableRef.current).DataTable();
            }, 100)
        });
    };
    const clearFilteredSales = () => {
        if (fromDate || toDate) {
            setFromDate('');
            setToDate('');
            fetchFilteredSales()
        }
    }
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
            <div className="row mb-3">
                <div className="col-md-3">
                    <label className="form-label">From Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                    />
                </div>
                <div className="col-md-3">
                    <label className="form-label">To Date</label>
                    <input
                        type="date"
                        className="form-control"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                    />
                </div>
                <div className="col-md-3 d-flex align-items-end">
                    <button className="btn btn-primary" onClick={fetchFilteredSales}>
                        Filter
                    </button>
                    <button className="btn btn-danger ms-2" onClick={clearFilteredSales}>
                        Clear Filter
                    </button>
                </div>
            </div>

            {
                loading ? <Loader /> : <div className='table-wrapper mt-5'>
                    <table className="w-full border display" ref={tableRef}>
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border px-4 py-2">Customer</th>
                                <th className="border px-4 py-2">Qty (L)</th>
                                <th className="border px-4 py-2">Milk Type</th>
                                <th className="border px-4 py-2">Date</th>
                                <th className="border px-4 py-2">Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales.map((s) => (
                                <tr key={s.id}>
                                    <td className="border px-4 py-2">{s.customer.first_name} {s.customer.last_name}</td>
                                    <td className="border px-4 py-2">{s.quantity}</td>
                                    <td className="border px-4 py-2">{milk_types_options.find(ele => ele.id === s.milk_type)?.value}</td>
                                    <td className="border px-4 py-2">{s.date}</td>
                                    <td className="border px-4 py-2">{formatCurrency(s.price)}</td>
                                </tr>
                            ))}
                        </tbody>
                        <tfoot >
                            <tr className="bg-dark text-white">
                                <td className="border px-4 py-2">Total Sale</td>
                                <td className="border px-4 py-2">{total.total_quantity} Lt.</td>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2"></td>
                                <td className="border px-4 py-2">{formatCurrency(total.total_price)}</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            }
        </div>
    );
};

export default Sales;
