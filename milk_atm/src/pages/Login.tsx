import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { loginUser } from "../services/api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

const LoginPage: React.FC = () => {
    const { login } = useAuth();
    const navigate = useNavigate();

    const [form, setForm] = useState({ phone_number: "", password: "" });
    const [error, setError] = useState<string>("");
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        try {
            const data = await loginUser(form.phone_number, form.password);
            login(data.access, data.user);
            navigate("/");
        } catch (err) {
            setError("Invalid credentials.");
        }
    };

    return (
        <div className="row mt-4">
            <div className="col-12 col-lg-6 offset-lg-4 border p-4 bg-light border-secondary rounded">
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
                        <div className="input-group">
                            <input
                                id="password"
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                className="form-control"
                                required
                            />
                            <span className="input-group-text" onClick={() => setShowPassword(prev => !prev)}
                                style={{ cursor: "pointer" }}>  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} /></span>
                        </div>
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
