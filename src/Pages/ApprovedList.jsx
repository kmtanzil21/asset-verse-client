import React, { useContext } from 'react';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';
import { AuthContext } from '../Contexts/AuthContext';

const ApprovedList = () => {
    const axiosPublic = useAxios();
    const { user } = useContext(AuthContext);

    // Fetch only approved requests
    const { data: approved = [] } = useQuery({
        queryKey: ['requests', 'approved'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/requests/approved?hrEmail=${user.email}&status=approved`);  // Pass the status filter
            return res.data;
        }
    });

    return (
        <div>
            <h2>Approved Requests</h2>
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
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* Mapping through the approved requests */}
                        {approved.map((request, index) => (
                            <tr key={request._id}>
                                <th>{index + 1}</th>
                                <td>{request.name}</td>
                                <td>{request.assetName}</td>
                                <td>{request.email}</td>
                                <td>{request.hrEmail}</td>
                                <td>{request.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovedList;
