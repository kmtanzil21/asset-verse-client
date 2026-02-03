import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { AuthContext } from '../Contexts/AuthContext';
import useAxios from '../hooks/useAxios';
import Swal from 'sweetalert2';

const EditProfile = () => {
    const axiosPublic = useAxios();
    const { user, loading } = useContext(AuthContext);
    const { register, handleSubmit } = useForm();

    console.log("from edit user",user.displayName);

    // Check if user is loading or user._id is not available
    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!user || !user._id) {
        Swal.fire('Error!', 'User data is not available. Please log in again.', 'error');
        return;
    }

    const handleEditProfile = async (data) => {
        try {
            const result = await axiosPublic.patch(`/users/${user._id}`, data);
            console.log(result);

            // If modifiedCount is greater than 0, show a success SweetAlert
            if (result.data.modifiedCount > 0) {
                Swal.fire('Updated!', 'Your profile has been updated successfully.', 'success');
            } else {
                Swal.fire('No changes!', 'No changes were made to your profile.', 'info');
            }
        } catch (error) {
            console.error("Error updating profile", error);
            Swal.fire('Error!', 'Failed to update your profile.', 'error');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(handleEditProfile)}>
                <fieldset className="fieldset">
                    <label className="label">Name</label>
                    <input 
                        type="text" 
                        {...register('name', { required: true })} 
                        className="input" 
                        placeholder="Name" 
                    />

                    <label className="label">Email</label>
                    <input 
                        type="email" 
                        {...register('email', { required: true })} 
                        className="input" 
                        placeholder="Email" 
                    />

                    <label className="label">Profile Photo Link</label>
                    <input 
                        type="text" 
                        {...register('image', { required: true })} 
                        className="input" 
                        placeholder="Profile Photo Link" 
                    />

                    <button className="btn btn-neutral mt-4">Update Profile</button>
                </fieldset>
            </form>
        </div>
    );
};

export default EditProfile;
