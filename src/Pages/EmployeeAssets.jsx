import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useAxios from '../hooks/useAxios';

const EmployeeAssets = () => {
  const { user } = useContext(AuthContext);
  const axiosPublic = useAxios();

  const {
    data: assets = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ['approved-requests', user?.email],
    enabled: !!user?.email, 
    queryFn: async () => {
      const res = await axiosPublic.get(`/requests/employee?email=${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <p className="p-10">Loading...</p>;
  if (error) return <p className="p-10 text-red-500">Failed to load.</p>;

  return (
    <div className="p-10">
      <div className="overflow-x-auto shadow-md rounded-lg">
        <table className="table table-zebra w-full">
          <thead className="bg-gray-200">
            <tr>
              <th>#</th>
              <th>Asset Name</th>
              <th>HR Contact</th>
              <th>Request Date</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {assets.map((asset, index) => (
              <tr key={asset._id}>
                <th>{index + 1}</th>
                <td className="font-semibold">{asset.assetName}</td>
                <td>{asset.hrEmail}</td>
                <td>{new Date(asset.requestedAt).toLocaleDateString()}</td>
                <td>
                  <span className="badge badge-success capitalize">
                    {asset.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {assets.length === 0 && (
          <p className="text-center py-10 text-gray-500">
            No approved assets found.
          </p>
        )}
      </div>
    </div>
  );
};

export default EmployeeAssets;
