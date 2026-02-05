import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import { Navigate, useLocation } from 'react-router';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext);
    const location = useLocation();

    // ✅ FIXED: Added 'return' so it stops here while loading
    if(loading){
        return (
            <div className="min-h-screen flex justify-center items-center">
                <span className="loading loading-spinner loading-lg text-primary"></span>
                <p className="ml-2">Data is Loading...</p>
            </div>
        );
    }

    if(!user){
        return <Navigate state={location.pathname} to="/login" replace />
    }

    return children;
};

export default PrivateRoute;