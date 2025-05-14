import React, { useState } from 'react';

interface Customer {
    id: number;
    name: string;
    mobile: string;
    address: string;
}

const Customers: React.FC = () => {
    const [customers, setCustomers] = useState<Customer[]>([]);
    const [form, setForm] = useState<Omit<Customer, 'id'>>({ name: '', mobile: '', address: '' });

    const handleAdd = () => {
        const newCustomer: Customer = {
            id: Date.now(),
            ...form,
        };
        setCustomers([...customers, newCustomer]);
        setForm({ name: '', mobile: '', address: '' });
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <input
                    placeholder="Name"
                    className="input border p-2 rounded"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    placeholder="Mobile"
                    className="input border p-2 rounded"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                />
                <input
                    placeholder="Address"
                    className="input border p-2 rounded"
                    value={form.address}
                    onChange={(e) => setForm({ ...form, address: e.target.value })}
                />
            </div>
            <button onClick={handleAdd} className="bg-green-600 text-white py-2 px-4 rounded mb-6">
                Add Customer
            </button>

            <table className="w-full border">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="border px-4 py-2">Name</th>
                        <th className="border px-4 py-2">Mobile</th>
                        <th className="border px-4 py-2">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map((c) => (
                        <tr key={c.id}>
                            <td className="border px-4 py-2">{c.name}</td>
                            <td className="border px-4 py-2">{c.mobile}</td>
                            <td className="border px-4 py-2">{c.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Customers;
