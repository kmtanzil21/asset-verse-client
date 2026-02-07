import React, { useContext, useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';

const ApprovedEmployeeList = () => {
    const axiosPublic = useAxios();
    const { user } = useContext(AuthContext); // user contains the logged-in HR info
    const [employees, setEmployees] = useState([]);
    const [myAssets, setMyAssets] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

 useEffect(() => {
    const fetchData = async () => {
        try {
            // ✅ FIX: Access the data directly since the backend returns an array
            const empRes = await axiosPublic.get(`/employee/${user.email}`);
            setEmployees(empRes.data); // Removed .employees

            const assetRes = await axiosPublic.get(`/my-assets?email=${user.email}`);
            setMyAssets(assetRes.data);
        } catch (error) {
            console.error("Error loading data:", error);
        }
    };
    if (user?.email) fetchData();
}, [user.email, axiosPublic]);

    const handleAssignDirectly = async (asset) => {
        // Data structure matching your image
        const assignmentData = {
            assetId: asset._id,
            name: selectedEmployee.name, // Employee Name
            assetName: asset.productName,
            email: selectedEmployee.email, // Employee Email
            hrEmail: user.email,           // HR Manager Email
            status: "approved",            // Direct assignment is pre-approved
            requestedAt: new Date().toISOString()
        };

        try {
            const res = await axiosPublic.post('/assign-asset-direct', assignmentData);
            if (res.data.insertedId) {
                Swal.fire({
                    title: "Asset Assigned!",
                    text: `${asset.productName} has been assigned to ${selectedEmployee.name}.`,
                    icon: "success",
                    timer: 2000,
                    showConfirmButton: false
                });
                document.getElementById('assign_modal').close();
            }
        } catch (error) {
            Swal.fire("Error", error.response?.data?.message || "Assignment failed", "error");
        }
    };

    const handleDeleteEmployee = (employee) => {
    // 1. Trigger the SweetAlert confirmation
    Swal.fire({
        title: "Are you sure?",
        text: `You are about to remove ${employee.name} from your employee list.`,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Yes, delete it!"
    }).then(async (result) => {
        // 2. Only proceed if the user clicked "Yes"
        if (result.isConfirmed) {
            try {
                // 3. Make the API call (Note the 'await' and leading '/')
                const res = await axiosPublic.delete(`/employee-delete/${employee.email}?hrEmail=${user.email}`);

                if (res.data.deletedCount > 0) {
                    // 4. Update the local UI state
                    const remaining = employees.filter(emp => emp.email !== employee.email);
                    setEmployees(remaining);

                    // 5. Success notification
                    Swal.fire({
                        title: "Deleted!",
                        text: "Employee has been removed.",
                        icon: "success",
                        timer: 1500,
                        showConfirmButton: false
                    });
                }
            } catch (error) {
                console.error("Delete Error:", error);
                Swal.fire("Error!", "Something went wrong while deleting.", "error");
            }
        }
    });
};

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-8">Employee Asset Assignment</h2>

            <div className="overflow-x-auto shadow-xl rounded-2xl border border-base-300">
                <table className="table table-lg w-full">
                    <thead className="bg-base-200">
                        <tr>
                            <th>#</th>
                            <th>Employee Name</th>
                            <th>Employee Email</th>
                            <th className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, idx) => (
                            <tr key={emp.email} className="hover">
                                <td>{idx + 1}</td>
                                <td className="font-bold">{emp.name}</td>
                                <td>{emp.email}</td>
                                <td className="text-center">
                                    <button 
                                        onClick={() => {
                                            setSelectedEmployee(emp);
                                            document.getElementById('assign_modal').showModal();
                                        }}
                                        className="btn btn-primary btn-sm px-6"
                                    >
                                        Assign Asset
                                    </button>

                                    <button onClick={()=>{handleDeleteEmployee(emp)}} className='btn btn-secondary btn-sm px-6 mx-2'>Delete Employee</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Assignment Modal */}
            <dialog id="assign_modal" className="modal modal-bottom sm:modal-middle">
                <div className="modal-box">
                    <h3 className="font-bold text-xl mb-6">Assigning to: {selectedEmployee?.name}</h3>
                    <div className="space-y-3 max-h-80 overflow-y-auto pr-2">
                        {myAssets.map(asset => (
                            <div key={asset._id} className="flex justify-between items-center p-4 bg-base-200 rounded-xl">
                                <div>
                                    <p className="font-bold">{asset.productName}</p>
                                    <p className="text-xs opacity-60">Stock: {asset.productQuantity}</p>
                                </div>
                                <button 
                                    disabled={asset.productQuantity <= 0}
                                    onClick={() => handleAssignDirectly(asset)}
                                    className="btn btn-success btn-sm text-white"
                                >
                                    Assign
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="modal-action">
                        <form method="dialog">
                            <button className="btn btn-ghost">Cancel</button>
                        </form>
                    </div>
                </div>
            </dialog>
        </div>
    );
};

export default ApprovedEmployeeList;