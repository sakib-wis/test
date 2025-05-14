import React from 'react';

const Dashboard: React.FC = () => {
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card title="Milk Sold Today" value="120 L" />
                <Card title="Revenue" value="₹3600" />
                <Card title="Transactions" value="15" />
            </div>
        </div>
    );
};

const Card: React.FC<{ title: string; value: string }> = ({ title, value }) => (
    <div className="bg-white p-4 rounded shadow text-center">
        <p className="text-sm text-gray-600">{title}</p>
        <h2 className="text-xl font-bold">{value}</h2>
    </div>
);

export default Dashboard;
