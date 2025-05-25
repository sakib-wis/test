// src/components/Footer.tsx
import React from 'react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-light text-center py-3 mt-auto">
            <div className="container">
                <small>&copy; {new Date().getFullYear()} Milk ATM. All rights reserved.</small>
            </div>
        </footer>
    );
};

export default Footer;
