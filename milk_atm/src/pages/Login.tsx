import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { loginUser } from "../services/api";

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ phone_number: "", password: "" });
    const [error, setError] = useState<string>("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(form.phone_number, form.password);
            login(data.token, data.user);
            navigate("/");
        } catch (err) {
            setError("Invalid credentials.");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-20 p-4 border rounded">
            <h2 className="text-2xl font-bold mb-4">Login</h2>
            {error && <div className="text-danger mb-2">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-4">
                <div className="mb-3">
                    <label className="form-label" htmlFor="phone_number">Phone Number</label>
                    <input
                        id="phone_number"
                        type="text"
                        name="phone_number"
                        placeholder="Phone Number"
                        value={form.phone_number}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="password">Password</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={form.password}
                        onChange={handleChange}
                        className="form-control"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
