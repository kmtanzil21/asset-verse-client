import React, { useContext, useState, useEffect } from 'react';
import { FaEdit, FaTrashAlt, FaHandPointer } from "react-icons/fa";
import { AuthContext } from '../Contexts/AuthContext';
import useAxios from '../hooks/useAxios';

const AssetCard = ({ asset, onDelete }) => {
    const { role } = useContext(AuthContext);
    const { _id, productName, productType, productQuantity, productImage, dateAdded } = asset;
    const { user } = useContext(AuthContext);
    const axiosPublic = useAxios();

    // Retrieve request status from localStorage (if available)
    const [requestStatus, setRequestStatus] = useState(() => {
        const savedStatus = localStorage.getItem(`requestStatus_${_id}`);
        return savedStatus ? savedStatus : null;
    });

    const handleRequest = async (asset) => {
        try {
            setRequestStatus('pending');
            localStorage.setItem(`requestStatus_${_id}`, 'pending'); // Save to localStorage

            const response = await axiosPublic.post('/request-asset', {
                assetId: asset._id,
                email: user.email,
                name:user.displayName,
                assetName:asset.productName
            });

            if (response.data) {
                setRequestStatus('requested');
                localStorage.setItem(`requestStatus_${_id}`, 'requested'); // Update localStorage
                alert('Asset requested successfully');
            }
        } catch (error) {
            setRequestStatus(null);
            localStorage.setItem(`requestStatus_${_id}`, null); // Clear from localStorage
            alert('Failed to request asset');
        }
    };

    useEffect(() => {
        // Ensure that if the status is set externally (e.g., after a successful request)
        // we sync it with localStorage (this could also be done on backend if needed)
        if (requestStatus) {
            localStorage.setItem(`requestStatus_${_id}`, requestStatus);
        }
    }, [requestStatus, _id]);

    return (
        <div className="bg-base-100 border border-base-300 rounded-2xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col gap-3">
            {/* Image & Type Tag */}
            <div className="relative">
                <img 
                    src={productImage || "https://via.placeholder.com/150?text=No+Image"} 
                    alt={productName} 
                    className="w-full h-40 object-cover rounded-xl bg-base-200"
                />
                <span className={`absolute top-2 right-2 badge ${productType === 'Returnable' ? 'badge-primary' : 'badge-neutral'} font-semibold border-none`}>
                    {productType}
                </span>
            </div>

            {/* Asset Details */}
            <div className="flex-grow">
                <h3 className="text-xl font-bold truncate text-base-content">{productName}</h3>
                <div className="flex justify-between items-center mt-2">
                    <div className="flex flex-col">
                        <p className="text-xs opacity-50 uppercase tracking-wider font-bold">Quantity</p>
                        <p className={`text-lg font-mono font-bold ${productQuantity > 0 ? 'text-success' : 'text-error'}`}>
                            {productQuantity}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-xs opacity-50 uppercase tracking-wider font-bold">Added On</p>
                        <p className="text-sm font-medium">{new Date(dateAdded).toLocaleDateString()}</p>
                    </div>
                </div>
            </div>
            
            {/* Actions Section */}
            <div className="mt-2 border-t border-base-200 pt-3">
                {/* Show Request Asset button for employees */}
                {role === "employee" ? (
                    <button 
                        onClick={() => handleRequest(asset)}
                        className="btn btn-primary btn-sm gap-2 w-full text-white shadow-md disabled:bg-base-300"
                    >
                        <FaHandPointer size={14} />
                        {requestStatus === 'pending' ? "Requesting..." : requestStatus === 'requested' ? "Requested" : productQuantity > 0 ? "Request Asset" : "Out of Stock"}
                    </button>
                ) : (
                    // Show Edit and Delete buttons for non-employees (e.g., HR, Admin)
                    <div className="flex gap-2">
                        <button className="btn btn-outline btn-info flex-1 btn-sm gap-2">
                            <FaEdit size={14} /> Edit
                        </button>
                        <button 
                            onClick={() => onDelete(_id)}
                            className="btn btn-outline btn-error flex-1 btn-sm gap-2"
                        >
                            <FaTrashAlt size={14} /> Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AssetCard;
