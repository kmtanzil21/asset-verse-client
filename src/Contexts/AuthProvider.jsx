import { 
    createUserWithEmailAndPassword, 
    onAuthStateChanged, 
    signInWithEmailAndPassword, 
    signOut, 
    updateProfile 
} from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { auth } from '../firebase/firebase.config';
import { AuthContext } from './AuthContext';
import useAxiosPublic from '../hooks/useAxios'; // Ensure this hook is correctly imported

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [role, setRole] = useState(null); // Custom state for MongoDB role
    const [loading, setLoading] = useState(true);
    const axiosPublic = useAxiosPublic();

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    };

    const updateUserProfile = (name, photo) => {
        return updateProfile(auth.currentUser, {
            displayName: name,
            photoURL: photo
        });
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            
            if (currentUser?.email) {
                try {
                    // Fetch the role from MongoDB based on the logged-in email
                    const res = await axiosPublic.get(`/users/role/${currentUser.email}`);
                    setRole(res.data.role);
                } catch (error) {
                    console.error("Error fetching user role:", error);
                    setRole(null);
                }
            } else {
                setRole(null);
            }
            
            setLoading(false);
            console.log('Current User:', currentUser);
        });
        
        return () => unsubscribe();
    }, [axiosPublic]);

    const authInfo = {
        user,
        role, // Now any component can access 'role' via useContext(AuthContext)
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
