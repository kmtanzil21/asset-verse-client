import React, { useContext } from 'react';
import { Link, NavLink, useNavigate } from 'react-router'; // Added useNavigate
import logo from '../assets/assetVerse.png'
import { AuthContext } from '../Contexts/AuthContext';
import Swal from 'sweetalert2';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogOut = async () => {
        try {
            await logOut();
            Swal.fire({
                icon: 'success',
                title: 'Logged Out',
                text: 'See you again soon!',
                showConfirmButton: false,
                timer: 1500
            });
            navigate("/login");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            {/* You can add conditional links here based on user role later */}
            {user && (
                <>
                    <li><NavLink to="/dashboard/my-assets">My Assets</NavLink></li>
                    <li><NavLink to="/assets">Assets</NavLink></li>
                    
                </>
            )}
        </>
    );

    return (
        <div className="navbar bg-base-100 shadow-sm px-4 md:px-8">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                        {links}
                    </ul>
                </div>
                <Link to="/">
                    <img className='w-32 md:w-40 h-auto' src={logo} alt="AssetVerse Logo" />
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2">
                    {links}
                </ul>
            </div>

            <div className="navbar-end gap-4">
                {user ? (
                    <div className="flex items-center gap-3">
                        {/* Display User Name (Hidden on small screens) */}
                        <span className="hidden md:block font-medium text-sm">
                            {user?.displayName}
                        </span>
                        
                        {/* Profile Picture */}
                        <div className="avatar">
                            <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                                <img 
                                    src={user?.photoURL || "https://cdn-icons-png.flaticon.com/512/149/149071.png"} 
                                    alt="User Profile" 
                                />
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button 
                            onClick={handleLogOut} 
                            className="btn btn-primary btn-error btn-sm md:btn-md"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <Link to="/login" className="btn btn-primary text-white px-6">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navbar;