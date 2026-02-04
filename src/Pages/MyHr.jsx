import React, { useContext, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useAxios from '../hooks/useAxios';
import { useQuery } from '@tanstack/react-query';

const MyHr = () => {
    const { user, loading } = useContext(AuthContext);
    const axiosPublic = useAxios();
    const [selectedEmail, setSelectedEmail] = useState(null);

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['hr', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const res = await axiosPublic.get(`/my-hr?email=${user.email}`);
            return res.data;
        }
    });

    const { data: colleagues = [], isLoading: isColleaguesLoading } = useQuery({
        queryKey: ['colleagues', selectedEmail],
        enabled: !!selectedEmail,
        queryFn: async () => {
            const res = await axiosPublic.get(`/colleagues?email=${selectedEmail}`);
            return res.data;
        }
    });

    const uniqueHREmails = [...new Set(requests.map(req => req.hrEmail))];

    // Filter colleagues to show only unique name and email pairs
    const uniqueColleagues = Array.from(
        new Map(colleagues.map(col => [col.email, col])).values()
    );

    const handleSeeColleague = (email) => {
        setSelectedEmail(email);
        document.getElementById('my_modal_5').showModal();
    };

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
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {uniqueHREmails.length > 0 ? (
                            uniqueHREmails.map((email, index) => (
                                <tr key={index}>
                                    <th>{index + 1}</th>
                                    <td>HR Member</td>
                                    <td>{email}</td>
                                    <td>
                                        <button onClick={() => handleSeeColleague(email)} className='btn btn-primary'>See Colleagues</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="text-center py-6 text-gray-500">No HR found.</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-lg">Colleagues for {selectedEmail}</h3>
                    <div className="py-4">
                        {isColleaguesLoading ? <span className="loading loading-spinner"></span> : 
                        <ul className="space-y-2">
                            {uniqueColleagues.map((col, idx) => (
                                <li key={idx} className="border-b pb-1">{col.name} - {col.email}</li>
                            ))}
                        </ul>}
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn">Close</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default MyHr;