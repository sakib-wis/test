import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

interface Props {
    children: React.ReactNode;
}

const ProtectedWrapper: React.FC<Props> = ({ children }) => {
    const { token } = useAuth();
    if (!token) {
        return <Navigate to="/login" replace />;
    }

    return <>{children}</>;
};

export default ProtectedWrapper;
