import React from 'react';
import { Route, redirect } from 'react-router-dom';
import AuthService from "./services/AuthService";

const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={props => 
        AuthService.isLoggedIn() 
            ? (<Component {...props} />) 
            : redirect("/login")
    } />
);

export default PrivateRoute;
