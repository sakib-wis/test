import React, { useState } from 'react'; import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CreditCard, BanknoteIcon } from 'lucide-react';

interface Sale {
    id: number;
    customer: string;
    quantity: number;
    price: number;
    date: string;
}

const Sales: React.FC = () => {
    const [sales, setSales] = useState<Sale[]>([]);
    const [form, setForm] = useState<Omit<Sale, 'id'>>({ customer: '', quantity: 0, price: 0, date: '' });

    const handleAddSale = () => {
        const newSale: Sale = {
            id: Date.now(),
            ...form,
        };
        setSales([...sales, newSale]);
        setForm({ customer: '', quantity: 0, price: 0, date: '' });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Milk Sales</h1>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                <input
                    placeholder="Customer Name"
                    className="border p-2 rounded"
                    value={form.customer}
                    onChange={(e) => setForm({ ...form, customer: e.target.value })}
                />
                <input
                    type="number"
                    placeholder="Quantity (L)"
                    className="border p-2 rounded"
                    value={form.quantity}
                    onChange={(e) => setForm({ ...form, quantity: Number(e.target.value) })}
                />
                <input
                    type="number"
                    placeholder="Price per Liter (₹)"
                    className="border p-2 rounded"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: Number(e.target.value) })}
                />
                <input
                    type="date"
                    className="border p-2 rounded"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                />
            </div>
            <button onClick={handleAddSale} className="bg-blue-600 text-white py-2 px-4 rounded mb-6">
                Add Sale
            </button>

            <table className="w-full border">
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
                            <td className="border px-4 py-2">{s.customer}</td>
                            <td className="border px-4 py-2">{s.quantity}</td>
                            <td className="border px-4 py-2">{s.price}</td>
                            <td className="border px-4 py-2">{s.quantity * s.price}</td>
                            <td className="border px-4 py-2">{s.date}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Sales;
