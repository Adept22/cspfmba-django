import { Navigate, redirect } from "react-router-dom";

import EntityService from '../../services/EntityService';

export const action = async ({ params }) => {
    await EntityService.delete('event-user-problem-types', params);
    
    return redirect(`/event-user-problem-types`);
}

const Delete = () => <Navigate to={`/event-user-problem-types`} />;

export default Delete;