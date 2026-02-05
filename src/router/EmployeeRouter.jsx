import React, { Children, useContext } from 'react';
import { AuthContext } from '../Contexts/AuthContext';
import useRole from '../hooks/useRole';

const EmployeeRouter = ({children}) => {
    const {user,loading}=useContext(AuthContext);
    const {role, roleLoading}=useRole();
    if(loading||roleLoading){
        return <div>Loading</div>
    }

    if(role!=='employee'){
        <div> access is forbidden</div>
    }
    return children;
};

export default EmployeeRouter;