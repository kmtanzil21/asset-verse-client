import React, { useContext, useState } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';

const Profile = () => {
    const { user, updateUserProfile } = useContext(AuthContext);
    const axiosSecure = useAxios();
    const [loading, setLoading] = useState(false);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setLoading(true);
        const form = e.target;
        const name = form.name.value;
        const photo = form.photo.value; // Assuming you have an image URL

        try {
            // 1. Update Firebase Profile
            await updateUserProfile(name, photo);

            // 2. Update MongoDB
            const res = await axiosSecure.patch('/update-profile', {
                name,
                image: photo
            });

            if (res.data.modifiedCount > 0) {
                Swal.fire("Success", "Profile updated successfully!", "success");
            }
        } catch (error) {
            Swal.fire("Error", "Could not update profile", "error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-10 bg-base-100 shadow-xl rounded-2xl border border-base-300">
            <h2 className="text-3xl font-bold mb-6">Your Profile</h2>
            
            <form onSubmit={handleUpdate} className="space-y-4">
                {/* Profile Picture Display */}
                <div className="flex flex-col items-center mb-6">
                    <div className="avatar">
                        <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                            <img src={user?.photoURL || "https://via.placeholder.com/150"} alt="Avatar" />
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Read-only Email */}
                    <div className="form-control">
                        <label className="label">Email (Read Only)</label>
                        <input type="email" value={user?.email || ""} readOnly className="input input-bordered bg-base-200" />
                    </div>

                    <div className="form-control">
                        <label className="label">Full Name</label>
                        <input name="name" type="text" defaultValue={user?.displayName} className="input input-bordered mx-2" required />
                    </div>

                    <div className="form-control md:col-span-2">
                        <label className="label">Profile Picture URL</label>
                        <input name="photo" type="text" defaultValue={user?.photoURL} className="input input-bordered mx-2" placeholder="https://image-link.com" />
                    </div>
                </div>

                <button type="submit" className={`btn btn-primary w-full mt-6 ${loading ? 'loading' : ''}`}>
                    Update Profile
                </button>
            </form>
        </div>
    );
};

export default Profile;