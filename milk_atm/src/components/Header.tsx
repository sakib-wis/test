import React from 'react';
import { Link } from 'react-router-dom';
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
                            <Link className="nav-link active" to="/">Dashboard</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/customers">Customers</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/sales">Sales</Link>
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
