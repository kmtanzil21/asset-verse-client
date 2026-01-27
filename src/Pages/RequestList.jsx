import React, { useContext } from 'react';
import useAxios from '../hooks/useAxios';
import { useMutation, useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/AuthContext';
import { Link } from 'react-router';

const RequestList = () => {
    const axiosPublic = useAxios();
    const { user } = useContext(AuthContext);

    const { data: requests = [], refetch } = useQuery({
        queryKey: ['requests', 'pending'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/requests?hrEmail=${user.email}`);
            return res.data;
        }
    });

    const approveRequest = useMutation({
        mutationFn: (requestId) => {
            return axiosPublic.patch(`/requests/${requestId}/approve`);
        },
        onSuccess: () => {
            refetch();
        },
        onError: (error) => {
            console.error("Error Approving Request:", error);
        }
    });

    const handleApprove = (request) => {
        console.log("Approving request ID:", request._id);  // Debugging the request ID
        approveRequest.mutate(request._id);
    };

    return (
        <div>
            <h2>Total Requests {requests.length}</h2>
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Asset Name</th>
                            <th>Email</th>
                            <th>HR Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapping through the requests */}
                        {requests.map((request, index) => (
                            <tr key={request._id}>
                                <th>{index + 1}</th>
                                <td>{request.name}</td>
                                <td>{request.assetName}</td>
                                <td>{request.email}</td>
                                <td>{request.hrEmail}</td>
                                <td>
                                    <Link>
                                        <button
                                            onClick={() => handleApprove(request)}
                                            className="btn btn-primary text-white font-bold"
                                            disabled={request.status === 'approved'}  // Disable button if status is approved
                                        >
                                            Approve
                                        </button>
                                    </Link>
                                    <Link>
                                        <button className="btn btn-secondary ml-2 text-white font-bold">Reject</button>
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default RequestList;
