import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
const Header: React.FC = () => {
    const { token, logout } = useAuth();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container">
                <Link className="navbar-brand" to="/">Milk ATM</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <NavLink
                                to="/"
                                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/customers"
                                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                            >
                                Customers
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink
                                to="/sales"
                                className={({ isActive }) => `nav-link ${isActive ? "active" : ""}`}
                            >
                                Sales
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            {token ? <button className="nav-link" onClick={logout}>Logout</button> : <Link className="nav-link" to="/login">Login</Link>}
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Header;
