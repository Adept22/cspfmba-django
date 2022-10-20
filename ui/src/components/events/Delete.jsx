import { Navigate, redirect } from "react-router-dom";

import EntityService from '../../services/EntityService';

export const action = async ({ params }) => {
    await EntityService.delete('events', params);
    
    return redirect(`/events`);
}

const Delete = () => <Navigate to={`/events`} />;

export default Delete;