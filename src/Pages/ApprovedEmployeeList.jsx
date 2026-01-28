import React, { useContext, useState, useEffect } from 'react';
import useAxios from '../hooks/useAxios';
import { AuthContext } from '../Contexts/AuthContext';
import { Link } from 'react-router';

const ApprovedEmployeeList = () => {
    const axiosPublic = useAxios();
    const { user } = useContext(AuthContext);
    const [hrDetails, setHrDetails] = useState(null);
    const [employees, setEmployees] = useState([]);

    useEffect(() => {
        const fetchApprovedEmployees = async () => {
            try {
                const res = await axiosPublic.get(`/hr/${user.email}/approved-employees`);
                setHrDetails({
                    companyName: res.data.companyName,
                    hrName: res.data.hrName,
                    hrEmail: res.data.hrEmail
                });
                setEmployees(res.data.employees);
            } catch (error) {
                console.error("Error fetching approved employees:", error);
            }
        };

        fetchApprovedEmployees();
    }, [user.email,axiosPublic]);  // Re-fetch if the logged-in user's email changes

    return (
        <div>
            <h2>Approved Employees</h2>

            {/* Display HR and Company Information */}
            {hrDetails && (
                <div>
                    <h3>HR Information</h3>
                    <p>HR Name: {hrDetails.hrName}</p>
                    <p>HR Email: {hrDetails.hrEmail}</p>
                    <p>Company: {hrDetails.companyName}</p>
                </div>
            )}

            {/* Employee List */}
            <div className="overflow-x-auto">
                <table className="table table-zebra">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Actions</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                        {employees.map((employee, index) => (
                            <tr key={employee.email}>
                                <td>{index+1}</td>
                                <td>{employee.name}</td>
                                <td>{employee.email}</td>
                                <td>
                                    <Link>
                                    <button className='btn btn-primary font-bold'>Assign Assets</button></Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ApprovedEmployeeList;
