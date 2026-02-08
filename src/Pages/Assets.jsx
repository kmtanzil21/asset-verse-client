import React, { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import AssetCard from '../components/AssetCard';

const Assets = () => {
    const axiosPublic = useAxios();
    const [currentPage, setCurrentPage] = useState(1);
    const [inputValue, setInputValue] = useState(''); // Immediate input state
    const [searchTerm, setSearchTerm] = useState(''); // Only updates after delay
    const itemsPerPage = 10;

    // --- Debounce Logic ---
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            setSearchTerm(inputValue);
            setCurrentPage(1); // Reset page on search
        }, 500); // 500ms delay

        return () => clearTimeout(delayDebounceFn);
    }, [inputValue]);

    const { data, isLoading } = useQuery({
        queryKey: ['all-assets', currentPage, searchTerm], // Now triggers only on searchTerm update
        queryFn: async () => {
            const res = await axiosPublic.get(
                `/all-assets?page=${currentPage}&limit=${itemsPerPage}&search=${searchTerm}`
            );
            return res.data;
        },
        keepPreviousData: true 
    });

    const assets = data?.assets || [];
    const totalPages = data?.totalPages || 0;
    const pages = [...Array(totalPages).keys()].map(num => num + 1);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    return (
        <div className="p-6 md:p-10 max-w-7xl mx-auto min-h-screen">
            <header className="mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 border-b border-base-300 pb-8">
                <div>
                    <h2 className="text-4xl font-extrabold text-base-content tracking-tight">Global Inventory</h2>
                    <p className="text-gray-500 mt-2 font-medium">Search and manage available company resources.</p>
                </div>

                <div className="w-full md:w-80">
                    <label className="input input-bordered flex items-center gap-2 shadow-sm focus-within:ring-2 focus-within:ring-primary/20">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input 
                            type="search" 
                            className="grow" 
                            placeholder="Search..." 
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)} // Updates local state instantly
                        />
                    </label>
                </div>
            </header>
            
            {assets.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {assets.map((asset) => (
                            <AssetCard key={asset._id} asset={asset} />
                        ))}
                    </div>

                    <div className="flex justify-center items-center gap-2 mt-12 pb-10">
                        <button 
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(prev => prev - 1)}
                            className="btn btn-sm btn-outline"
                        >
                            Previous
                        </button>

                        {pages.map(page => (
                            <button
                                key={page}
                                onClick={() => setCurrentPage(page)}
                                className={`btn btn-sm ${currentPage === page ? 'btn-primary' : 'btn-ghost'}`}
                            >
                                {page}
                            </button>
                        ))}

                        <button 
                            disabled={currentPage === totalPages}
                            onClick={() => setCurrentPage(prev => prev + 1)}
                            className="btn btn-sm btn-outline"
                        >
                            Next
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex flex-col items-center justify-center py-32 bg-base-200 rounded-3xl border-2 border-dashed border-base-300">
                    <p className="text-2xl font-bold opacity-30">No assets found.</p>
                </div>
            )}
        </div>
    );
};

export default Assets;