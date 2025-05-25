import React, {
    createContext,
    useContext,
    useState,
    ReactNode,
    useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface User {
    id: number;
    phone_number: string;
    full_name: string | null;
}

interface AuthContextType {
    token: string | null;
    user: User | null;
    login: (token: string, user: User) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type JWTPayload = {
    exp: number; // expiration time, in seconds since epoch
    // ...any other claims you might have
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
    children,
}) => {
    const navigate = useNavigate();
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    );
    const [user, setUser] = useState<User | null>(
        localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")!) : null
    );

    const login = (newToken: string, newUser: User) => {
        setToken(newToken);
        setUser(newUser);
        localStorage.setItem("token", newToken);
        localStorage.setItem("user", JSON.stringify(newUser));
    };

    const logout = () => {
        setToken(null);
        setUser(null);
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
    };

    // helper to check expiry
    const isTokenExpired = (token: string) => {
        try {
            const { exp } = jwtDecode<JWTPayload>(token);
            // exp is in seconds; Date.now() is milliseconds
            return Date.now() >= exp * 1000;
        } catch (e) {
            // invalid token
            return true;
        }
    };

    // on mount & whenever token changes, verify it
    useEffect(() => {
        if (token) {
            if (isTokenExpired(token)) {
                // token expired: clear out and redirect
                logout();
            }
        }
    }, [token]);

    return (
        <AuthContext.Provider value={{ token, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
