// UpgradePackage.jsx

import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Contexts/AuthContext';

const UpgradePackage = () => {
    const axiosPublic = useAxios();
    const { user } = useContext(AuthContext);

    // Fetching the packages from your MongoDB via the backend
    const { data: packages = [], isLoading } = useQuery({
        queryKey: ['packages'],
        queryFn: async () => {
            const res = await axiosPublic.get('/packages');
            return res.data;
        }
    });

    const handleCheckout = async (pkg) => {
        try {
            const res = await axiosPublic.post('/create-checkout-session', {
                price: pkg.price,
                name: pkg.name,
                email: user?.email
            });
            if (res.data.url) {
                window.location.assign(res.data.url); // Redirect to Stripe's checkout page
            }
        } catch (error) {
            console.error("Checkout failed:", error);
        }
    };

    if (isLoading) return <div className="text-center py-20 animate-pulse text-blue-600 font-bold">Loading Premium Plans...</div>;

    return (
    <div>
        <div className="overflow-x-auto">
  <table className="table table-zebra">
    {/* head */}
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Employee Limit</th>
        <th>Price</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {
        packages.map((pkg,index)=>
         <tr key={pkg._id}>
        <th>{index+1}</th>
        <td>{pkg.name} </td>
        <td>{pkg.employeeLimit}</td>
        <td>{pkg.price}</td>
        <td><button onClick={()=>handleCheckout(pkg)} className='btn btn-primary'>Buy Package</button></td>
      </tr>)
      }
     
     
    </tbody>
  </table>
</div>
    </div>
    )
};

export default UpgradePackage;
