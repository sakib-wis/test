import React from 'react';
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
const Header: React.FC = () => {
    const { token, logout } = useAuth();
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src="./logo.png" alt="logo" className='logo' /> Milk ATM</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
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
