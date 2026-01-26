import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; 
import { motion, AnimatePresence } from "framer-motion";
import useAxios from "../hooks/useAxios";
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";

const Register = () => {
    const [role, setRole] = useState("employee");
    const { createUser, updateUserProfile } = useContext(AuthContext);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const axiosPublic = useAxios();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            // 1. Create user in Firebase
            const result = await createUser(data.email, data.password);
            
            // 2. Determine profile photo and update Firebase profile
            const photo = role === "hr" ? data.companyLogo : "https://cdn-icons-png.flaticon.com/512/149/149071.png";
            await updateUserProfile(data.name, photo);

            // 3. Construct user info for MongoDB
            const userInfo = {
                name: data.name,
                email: data.email,
                dateOfBirth: data.dob,
                role: role,
                image: photo,
                ...(role === 'hr' && {
                    companyName: data.companyName,
                    companyLogo: data.companyLogo,
                    package: 'Basic', // Default package
                    packageLimit: 5,  // Default limit
                }),
                ...(role === 'employee' && {
                    company: null, // Initially unaffiliated
                })
            };

            // 4. Save to MongoDB database
            const res = await axiosPublic.post('/users', userInfo);
            
            if (res.data.insertedId) {
                reset();
                Swal.fire({
                    icon: 'success',
                    title: 'Registration Successful',
                    text: `Welcome to AssetVerse as an ${role === 'hr' ? 'HR Manager' : 'Employee'}!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                navigate("/"); // Redirect to home or dashboard
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Registration Failed',
                text: error.message
            });
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4">
            <div className="card w-full max-w-lg bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-6 text-primary">Create Account</h2>
                    
                    {/* Role Selection Dropdown */}
                    <fieldset className="fieldset mb-4">
                        <legend className="fieldset-legend font-semibold">Join As</legend>
                        <select 
                            className="select select-bordered w-full" 
                            value={role}
                            onChange={(e) => { setRole(e.target.value); reset(); }}
                        >
                            <option value="employee">Employee</option>
                            <option value="hr">HR Manager</option>
                        </select>
                    </fieldset>

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <fieldset className="fieldset space-y-2">
                            {/* Common Fields */}
                            <label className="label">Full Name</label>
                            <input 
                                type="text" 
                                placeholder="John Doe" 
                                {...register("name", { required: "Name is required" })} 
                                className="input input-bordered w-full" 
                            />
                            {errors.name && <span className="text-error text-xs">{errors.name.message}</span>}
                            
                            <label className="label">Email</label>
                            <input 
                                type="email" 
                                placeholder="email@example.com" 
                                {...register("email", { required: "Email is required" })} 
                                className="input input-bordered w-full" 
                            />
                            {errors.email && <span className="text-error text-xs">{errors.email.message}</span>}
                            
                            <label className="label">Password</label>
                            <input 
                                type="password" 
                                placeholder="••••••••" 
                                {...register("password", { 
                                    required: "Password is required", 
                                    minLength: { value: 6, message: "Minimum 6 characters" },
                                    pattern: {
                                        value: /^(?=.*[a-z])(?=.*[A-Z]).+$/,
                                        message: "Must include at least one uppercase and one lowercase letter" //
                                    }
                                })} 
                                className="input input-bordered w-full" 
                            />
                            {errors.password && <span className="text-error text-xs">{errors.password.message}</span>}
                            
                            <label className="label italic text-sm">Date of Birth</label>
                            <input 
                                type="date" 
                                {...register("dob", { required: "Date of Birth is required" })} 
                                className="input input-bordered w-full" 
                            />
                            {errors.dob && <span className="text-error text-xs">{errors.dob.message}</span>}

                            {/* HR Specific Fields with Animation */}
                            <AnimatePresence>
                                {role === "hr" && (
                                    <motion.div 
                                        initial={{ opacity: 0, height: 0 }} 
                                        animate={{ opacity: 1, height: "auto" }} 
                                        exit={{ opacity: 0, height: 0 }}
                                        className="overflow-hidden space-y-2"
                                    >
                                        <label className="label">Company Name</label>
                                        <input 
                                            type="text" 
                                            placeholder="AssetVerse Ltd" 
                                            {...register("companyName", { required: "Company Name is required" })} 
                                            className="input input-bordered w-full" 
                                        />
                                        
                                        <label className="label">Company Logo URL</label>
                                        <input 
                                            type="text" 
                                            placeholder="https://logo.url" 
                                            {...register("companyLogo", { required: "Company Logo is required" })} 
                                            className="input input-bordered w-full" 
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <button className="btn btn-primary mt-6 w-full text-white shadow-lg">Sign Up</button>
                        </fieldset>
                    </form>
                    
                    <p className="text-center mt-4 text-sm">
                        Already have an account? <Link to="/login" className="link link-primary font-bold">Login</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;