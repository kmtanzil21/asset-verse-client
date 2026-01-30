import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';

const EditAsset = () => {
    const { id } = useParams();
    const axiosPublic = useAxios();
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();

    const { data: asset, isLoading } = useQuery({
        queryKey: ['asset', id],
        queryFn: async () => {
            const res = await axiosPublic.get(`/assets/${id}`);
            return res.data;
        }
    });

    // Reset form with fetched data once loaded
    useEffect(() => {
        if (asset) reset(asset);
    }, [asset, reset]);

    const onSubmit = async (data) => {
        try {
            const res = await axiosPublic.patch(`/assets/${id}`, data);
            if (res.data.modifiedCount > 0) {
                Swal.fire("Updated!", "Asset details modified.", "success");
                navigate('/dashboard/my-assets');
            }
        } catch (error) {
            console.error("Update failed", error);
        }
    };

    if (isLoading) return <div className="text-center py-10">Loading Asset...</div>;

    return (
        <div className="max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg border border-gray-100">
            <h2 className="text-2xl font-bold mb-6 text-blue-600">Edit Asset</h2>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Name</label>
                    <input 
                        {...register("productName")}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <div>
                    <label className="block text-sm font-medium text-gray-700">Product Quantity</label>
                    <input 
                        type="number"
                        {...register("productQuantity")}
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-blue-500 outline-none" 
                    />
                </div>
                <button 
                    type="submit" 
                    className="w-full py-3 btn btn-primary text-white font-bold rounded-xl hover:bg-indigo-700 transition-all"
                >
                    Update Asset
                </button>
            </form>
        </div>
    );
};

export default EditAsset;