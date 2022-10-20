import { Navigate, redirect } from "react-router-dom";

import EntityService from '../../services/EntityService';

export const action = async ({ params }) => {
    await EntityService.delete('problem-types', params);
    
    return redirect(`/problem-types`);
}

const Delete = () => <Navigate to={`/problem-types`} />;

export default Delete;