import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Contexts/AuthContext";

const UpgradePackage = () => {
  const axiosPublic = useAxios();
  const { user } = useContext(AuthContext);

  const { data: packages = [], isLoading } = useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axiosPublic.get("/packages");
      return res.data;
    },
  });

  const handleCheckout = async (pkg) => {
    try {
      const res = await axiosPublic.post("/create-checkout-session", {
        packageId: pkg._id,
        name: pkg.name,
        price: pkg.price,
        employeeLimit: pkg.employeeLimit,
        email: user.email,
      });

      if (res.data.url) {
        window.location.assign(res.data.url);
      }
    } catch (error) {
      console.error("Checkout failed:", error.message);
    }
  };

  if (isLoading) {
    return <div className="text-center py-20">Loading packages...</div>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Employee Limit</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg, index) => (
            <tr key={pkg._id}>
              <th>{index + 1}</th>
              <td>{pkg.name}</td>
              <td>{pkg.employeeLimit}</td>
              <td>${pkg.price}</td>
              <td>
                <button
                  onClick={() => handleCheckout(pkg)}
                  className="btn btn-primary"
                >
                  Buy Package
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UpgradePackage;
