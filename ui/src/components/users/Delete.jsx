import { Navigate, redirect } from "react-router-dom";

import EntityService from '../../services/EntityService';

export const action = async ({ params }) => {
    await EntityService.delete('users', params);
    
    return redirect(`/users`);
}

const Delete = () => <Navigate to={`/users`} />;

export default Delete;