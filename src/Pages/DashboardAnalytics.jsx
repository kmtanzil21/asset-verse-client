import React, { useEffect, useState, useContext } from 'react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Contexts/AuthContext';

const COLORS = ['#4F46E5', '#10B981', '#F59E0B', '#EF4444'];

const DashboardAnalytics = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxios();
    const [pieData, setPieData] = useState([]);
    const [barData, setBarData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAnalytics = async () => {
            if (user?.email) {
                try {
                    const [pieRes, barRes] = await Promise.all([
                        axiosSecure.get(`/asset-distribution?email=${user.email}`),
                        axiosSecure.get(`/top-requests?email=${user.email}`)
                    ]);
                    setPieData(pieRes.data);
                    setBarData(barRes.data);
                } catch (error) {
                    console.error("Failed to load analytics", error);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchAnalytics();
    }, [user?.email, axiosSecure]);

    if (loading) return <div className="p-10 text-center"><span className="loading loading-spinner loading-lg"></span></div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-4">
            {/* Pie Chart Box */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-lg font-bold text-center mb-6 text-gray-700">Asset Type Distribution</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={pieData}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                outerRadius={80}
                                fill="#8884d8"
                                dataKey="value"
                                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                            >
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend verticalAlign="bottom" height={36}/>
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Bar Chart Box */}
            <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <h3 className="text-lg font-bold text-center mb-6 text-gray-700">Top 5 Requested Assets</h3>
                <div className="h-72">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                            <XAxis dataKey="name" tick={{fontSize: 12}} />
                            <YAxis />
                            <Tooltip cursor={{fill: '#f3f4f6'}} />
                            <Bar dataKey="count" fill="#6366F1" radius={[5, 5, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardAnalytics;