import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Contexts/AuthContext";

const PaymentHistory = () => {
  const axiosPublic = useAxios();
  const { user } = useContext(AuthContext);

  const { data: history = [], isLoading } = useQuery({
    queryKey: ["payment-history", user?.email],
    enabled: !!user?.email, // Only run if email exists
    queryFn: async () => {
      const res = await axiosPublic.get(`/payment-history/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div className="text-center py-10">Loading History...</div>;

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">My Payment History</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>#</th>
              <th>Package ID</th>
              <th>Amount Paid</th>
              <th>Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={item._id}>
                <th>{index + 1}</th>
                <td className="font-mono text-sm">{item.packageID}</td>
                <td>${item.amount} {item.currency.toUpperCase()}</td>
                <td>{new Date(item.paidAt).toLocaleDateString()}</td>
                <td><span className="badge badge-success">Success</span></td>
              </tr>
            ))}
          </tbody>
        </table>
        {history.length === 0 && (
          <p className="text-center py-10 text-gray-500">No payment records found.</p>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;