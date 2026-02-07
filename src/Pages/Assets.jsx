import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxios from '../hooks/useAxios';
import AssetCard from '../components/AssetCard';

const Assets = () => {
    const axiosPublic = useAxios();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Pass the page to the queryKey so it refetches on page change
    const { data, isLoading } = useQuery({
        queryKey: ['all-assets', currentPage],
        queryFn: async () => {
            const res = await axiosPublic.get(`/all-assets?page=${currentPage}&limit=${itemsPerPage}`);
            return res.data;
        },
        keepPreviousData: true // Keeps old data visible while fetching new page
    });

    const assets = data?.assets || [];
    const totalPages = data?.totalPages || 0;

    // Generate array of page numbers [1, 2, 3...]
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
            {/* Header logic same as before */}
            
            {assets.length > 0 ? (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                        {assets.map((asset) => (
                            <AssetCard key={asset._id} asset={asset} />
                        ))}
                    </div>

                    {/* Pagination Controls */}
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
                <div className="flex flex-col items-center justify-center py-32 bg-base-200 rounded-3xl">
                    <p className="text-2xl font-bold opacity-30">No assets found.</p>
                </div>
            )}
        </div>
    );
};

export default Assets;