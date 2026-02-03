import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile 
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config'; // Import your Firebase auth configuration
import { AuthContext } from './AuthContext'; // Ensure this context is set up properly
import useAxiosPublic from '../hooks/useAxios'; // Make sure this hook is correctly imported

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // Custom state for MongoDB role
    const [loading, setLoading] = useState(true); // State to handle loading
    const axiosPublic = useAxiosPublic(); // Custom hook for Axios

    // Function to create a user
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    // Function to sign in a user
    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    // Function to log out a user
    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    // Function to update the user's profile
    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            
            // If the user is logged in, fetch their role from MongoDB
            if (currentUser?.email) {
                try {
                    // Fetch the role from the backend (MongoDB)
                    const res = await axiosPublic.get(`/users/role/${currentUser.email}`);
                    setRole(res.data.role); // Set role based on MongoDB response
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setRole(null); // In case of error, reset role to null
                }
            } else {
                setRole(null); // If user is not logged in, reset role
            }
            
            setLoading(false); // Set loading to false once user data is available
            console.log('Current User:', currentUser); // Log current user info
        });
        
        return () => unsubscribe(); // Cleanup on component unmount
    }, [axiosPublic]); // Re-run useEffect if axiosPublic changes

    // Object to pass down to children via Context
    const authInfo = {
        user,
        role, // Expose user and role to the context
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile
    };

    // Return the AuthContext.Provider with value containing the auth data
    return (
        <AuthContext.Provider value={authInfo}>
            {children} {/* Render the children components that will use the auth context */}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
