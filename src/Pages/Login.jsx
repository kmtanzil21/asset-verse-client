import { useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router"; 
import { AuthContext } from "../Contexts/AuthContext";
import Swal from "sweetalert2";
import useAxios from "../hooks/useAxios";

const Login = () => {
    // 1. Destructure signIn from your AuthContext
    const { signIn } = useContext(AuthContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();
    const axiosPublic = useAxios();

    const onLogin = async (data) => {
        try {
            // 2. Use data.email and data.password from the form for Firebase Auth
            await signIn(data.email, data.password); 

            Swal.fire({
                icon: 'success',
                title: 'Welcome Back!',
                text: 'Login successful.',
                showConfirmButton: false,
                timer: 1500
            });

            // 3. Redirect to Home (Dashboard logic usually happens in the Navbar or Home)
            navigate("/"); 
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Login Failed',
                text: "Invalid email or password. Please try again."
            });
        }
    };

    return (
        <div className="min-h-screen bg-base-200 flex items-center justify-center py-10 px-4">
            <div className="card w-full max-w-sm bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="text-3xl font-bold text-center mb-6 text-primary">Login</h2>
                    
                    <form onSubmit={handleSubmit(onLogin)}>
                        <fieldset className="fieldset space-y-4">
                            {/* Email Field */}
                            <div>
                                <label className="label font-medium">Email</label>
                                <input 
                                    type="email" 
                                    placeholder="email@example.com" 
                                    {...register("email", { required: "Email is required" })} 
                                    className="input input-bordered w-full" 
                                />
                                {errors.email && <span className="text-error text-xs mt-1">{errors.email.message}</span>}
                            </div>
                            
                            {/* Password Field */}
                            <div>
                                <label className="label font-medium">Password</label>
                                <input 
                                    type="password" 
                                    placeholder="••••••••" 
                                    {...register("password", { required: "Password is required" })} 
                                    className="input input-bordered w-full" 
                                />
                                {errors.password && <span className="text-error text-xs mt-1">{errors.password.message}</span>}
                                <div className="mt-1">
                                    <a className="link link-hover text-xs">Forgot password?</a>
                                </div>
                            </div>

                            <button className="btn btn-primary mt-4 w-full text-white shadow-lg">
                                Login
                            </button>
                        </fieldset>
                    </form>

                    <div className="divider text-gray-400">OR</div>

                    <p className="text-center text-sm">
                        New to AssetVerse? <Link to="/register" className="link link-primary font-bold">Register Now</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;