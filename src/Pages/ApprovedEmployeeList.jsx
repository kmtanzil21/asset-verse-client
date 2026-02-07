import React, { useContext, useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';

const ApprovedEmployeeList = () => {
    const axiosPublic = useAxios();
    const { user } = useContext(AuthContext);
    const [employees, setEmployees] = useState([]);
    const [myAssets, setMyAssets] = useState([]);
    const [selectedEmployee, setSelectedEmployee] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            if (user?.email) {
                const empRes = await axiosPublic.get(`/employee/${user.email}`);
                setEmployees(empRes.data);
                const assetRes = await axiosPublic.get(`/my-assets?email=${user.email}`);
                setMyAssets(assetRes.data);
            }
        };
        fetchData();
    }, [user?.email, axiosPublic]);

    const handleAssignDirectly = async (asset) => {
        try {
            const res = await axiosPublic.post('/assign-asset-direct', {
                assetId: asset._id,
                name: selectedEmployee.name,
                assetName: asset.productName,
                email: selectedEmployee.email,
                hrEmail: user.email,
                status: "approved",
                requestedAt: new Date().toISOString()
            });
            if (res.data.insertedId) {
                // ✅ This ID must match the dialog id below
                document.getElementById('assign_modal').close(); 
                Swal.fire("Success", "Asset assigned directly", "success");
            }
        } catch (error) {
            Swal.fire("Error", "Assignment failed", "error");
        }
    };

    const handleDeleteEmployee = (employee, event) => {
        if (event) event.currentTarget.blur();
        Swal.fire({
            title: "Are you sure?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, delete!"
        }).then(async (result) => {
            if (result.isConfirmed) {
                const res = await axiosPublic.delete(`/employee-delete/${employee.email}?hrEmail=${user.email}`);
                if (res.data.deletedCount > 0) {
                    setEmployees(employees.filter(emp => emp.email !== employee.email));
                    Swal.fire("Deleted!", "Employee removed.", "success");
                }
            }
        });
    };

    return (
        <div className="p-10">
            <h2 className="text-3xl font-bold mb-8">Employee List</h2>
            <div className="overflow-x-auto shadow-xl rounded-2xl border border-base-300">
                <table className="table table-lg w-full">
                    <thead className="bg-base-200">
                        <tr><th>#</th><th>Name</th><th>Email</th><th>Action</th></tr>
                    </thead>
                    <tbody>
                        {employees.map((emp, idx) => (
                            <tr key={emp.email}>
                                <td>{idx + 1}</td>
                                <td>{emp.name}</td>
                                <td>{emp.email}</td>
                                <td>
                                    <button 
                                        onClick={() => { 
                                            setSelectedEmployee(emp); 
                                            // ✅ Triggering the modal by ID
                                            document.getElementById('assign_modal').showModal(); 
                                        }} 
                                        className="btn btn-primary btn-sm"
                                    >
                                        Assign Asset
                                    </button>
                                    <button onClick={(e) => handleDeleteEmployee(emp, e)} className="btn btn-secondary btn-sm mx-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* ✅ MISSING MODAL CODE - ADD THIS BACK IN */}
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