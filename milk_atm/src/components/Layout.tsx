// src/components/Layout.tsx
import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    return (
        <div className="d-flex flex-column min-vh-100">
            <Header />
            <main className="flex-grow-1 container my-4">{children}</main>
            <Footer />
        </div>
    );
};

export default Layout;
