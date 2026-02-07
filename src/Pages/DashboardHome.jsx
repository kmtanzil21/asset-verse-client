import React from 'react';
import useRole from '../hooks/useRole';
import DashboardAnalytics from './DashboardAnalytics';

const DashboardHome = () => {
    const { role, loading } = useRole();

    if (loading) return (
        <div className="min-h-[60vh] flex justify-center items-center">
            <span className="loading loading-spinner loading-lg"></span>
        </div>
    );

    return (
        <div>
            {role === 'hr' ? (
                <DashboardAnalytics/>
            ) : (
                <div className="p-10 text-center bg-white rounded-2xl shadow-sm border border-gray-100">
                    <h2 className="text-3xl font-bold text-gray-800">Welcome to your Dashboard!</h2>
                    <p className="mt-4 text-gray-600">Please use the sidebar to manage your assets and requests.</p>
                </div>
            )}
        </div>
    );
};

export default DashboardHome;