import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import AssetCard from '../components/AssetCard';

const Assets = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxios();

    // Destructured data (renamed to assets) and isLoading
    const { data: assets = [], isLoading } = useQuery({
        queryKey: ['all-assets'],
        queryFn: async () => {
            const res = await axiosPublic.get('/all-assets');
            return res.data;
        }
    });

    // Added missing handler stubs to prevent reference errors
    const handleDelete = (id) => {
        console.log("Delete asset", id);
    };

    const handleRequest = (asset) => {
        console.log("Request asset", asset);
    };

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
            <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-base-300 pb-6">
                <div>
                    <h2 className="text-4xl font-extrabold text-base-content tracking-tight">Global Inventory</h2>
                    <p className="text-gray-500 mt-2 font-medium">
                        View and manage all company resources available in the system.
                    </p>
                </div>
                <div className="stats shadow-sm bg-base-200">
                    <div className="stat py-2 px-4">
                        <div className="stat-title text-xs font-bold uppercase">Total Items</div>
                        <div className="stat-value text-2xl text-primary">{assets.length}</div>
                    </div>
                </div>
            </header>

            {assets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {assets.map((asset) => (
                        <AssetCard 
                            key={asset._id} 
                            asset={asset} 
                            onDelete={handleDelete}
                            onRequest={handleRequest} 
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
                    <p className="text-2xl font-bold opacity-30">No assets found.</p>
                </div>
            )}
        </div>
    );
};

export default Assets;