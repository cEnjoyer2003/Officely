import React, { useState, useEffect, useContext } from "react";

const AdminContext = React.createContext();

export const useAdminContext = () => useContext(AdminContext);

export const AdminProvider = ({ children }) => {
    const [token, setToken] = useState(() => {
        return localStorage.getItem('token') || "";
    });

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    const contextValue = {
        token,
        setToken
    };

    return (
        <AdminContext.Provider value={contextValue}>
            {children}
        </AdminContext.Provider>
    );
};
