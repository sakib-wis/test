import React, { useState } from 'react';

const Login: React.FC = () => {
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Call login API here
        console.log(mobile, password);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                className="bg-white p-6 rounded shadow-md w-80"
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin();
                }}
            >
                <h2 className="text-xl font-bold mb-4 text-center">Login</h2>
                <input
                    type="text"
                    placeholder="Mobile Number"
                    className="input mb-2 w-full border p-2 rounded"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="input mb-4 w-full border p-2 rounded"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
