import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const MyHr = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxios();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['hr', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/my-hr?email=${user.email}`);
            return res.data;
        }
    });

    const uniqueHREmails = [...new Set(requests.map(req => req.hrEmail))];

    if (loading || isLoading) {
        return <div className="p-10 text-center"><span className="loading loading-spinner"></span></div>;
    }

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">My Associated HRs</h2>
            <div className="overflow-x-auto shadow-md rounded-lg">
                <table className="table table-zebra w-full">
                    <thead className="bg-gray-100">
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uniqueHREmails.length > 0 ? (
                            uniqueHREmails.map((email, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src="https://via.placeholder.com/150" alt="HR" />
                                            </div>
                                        </div>
                                    </td>
                                    <td>HR Member</td> 
                                    <td>{email}</td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-gray-500">
                                    No HR found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyHr;