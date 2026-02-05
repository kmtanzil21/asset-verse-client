import React, { Children, useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useRole from '../hooks/useRole';

const HRRoute = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const {role, roleLoading}=useRole();
    if(loading||roleLoading){
        return <div>Loading</div>
    }

    if(role!=='hr'){
        <div> access is forbidden</div>
    }
    return children;
};

export default HRRoute;