import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import AssetCard from '../components/AssetCard';
import Swal from 'sweetalert2';

const MyAssets = () => {
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxios();

    const { data: assets = [], isLoading, refetch } = useQuery({
        queryKey: ['my-assets', user?.email],
        queryFn: async () => {
            const res = await axiosPublic.get(`/my-assets?email=${user?.email}`);
            return res.data;
        },
        enabled: !!user?.email // Only run if user email is available
    });

    const handleDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "This asset will be removed from your personal list.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#EF4444",
            confirmButtonText: "Yes, delete it!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/assets/${id}`);
                if (res.data.deletedCount > 0) {
                    refetch();
                    Swal.fire("Deleted!", "Asset removed.", "success");
                }
            }
        });
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
            <header className="mb-12 border-b border-base-300 pb-6">
                <h2 className="text-4xl font-extrabold text-base-content tracking-tight">My Uploaded Assets</h2>
                <p className="text-gray-500 mt-2 font-medium">
                    Managing assets uploaded by: <span className="text-primary">{user?.email}</span>
                </p>
            </header>

            {assets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {assets.map((asset) => (
                        <AssetCard 
                            key={asset._id} 
                            asset={asset} 
                            role="hr" // Explicitly setting role to show Edit/Delete
                            handleDelete={handleDelete}
                        />
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
                    <p className="text-2xl font-bold opacity-30">You haven't uploaded any assets yet.</p>
                </div>
            )}
        </div>
    );
};

export default MyAssets;