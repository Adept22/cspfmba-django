import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import './index.css';
import reportWebVitals from './reportWebVitals';

import App from './App';

import Home from './components/home';

import Events, { loader as eventsLoader } from './components/events';
import CreateEvent, { action as createEventAction } from './components/events/Create';

import Users, { loader as usersLoader } from './components/users';
import CreateUser, { action as createUserAction } from './components/users/Create';

import ProblemTypes, { loader as problemTypesLoader } from './components/problem-types';
import CreateProblemType, { action as createProblemTypeAction } from './components/problem-types/Create';

import EventUserProblemTypes, { loader as eventUserProblemTypesLoader } from './components/event-user-problem-types';
import CreateEventUserProblemType, { action as createEventUserProblemTypeAction } from './components/event-user-problem-types/Create';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        breadcrumb: "Главная",
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "events",
                loader: eventsLoader,
                element: <Events />,
                breadcrumb: "События"
            },
            {
                path: "events/create",
                action: createEventAction,
                element: <CreateEvent />,
                breadcrumb: "Новое событие",
            },
            {
                path: "users",
                loader: usersLoader,
                element: <Users />,
                breadcrumb: "Пользователи",
            },
            {
                path: "users/create",
                action: createUserAction,
                element: <CreateUser />,
                breadcrumb: "Новый пользователь",
            },
            {
                path: "problem-types",
                loader: problemTypesLoader,
                element: <ProblemTypes />,
                breadcrumb: "Типы проблем",
            },
            {
                path: "problem-types/create",
                action: createProblemTypeAction,
                element: <CreateProblemType />,
                breadcrumb: "Новый тип проблемы",
            },
            {
                path: "event-user-problem-types",
                loader: eventUserProblemTypesLoader,
                element: <EventUserProblemTypes />,
                breadcrumb: "Связи",
            },
            {
                path: "event-user-problem-types/create",
                action: createEventUserProblemTypeAction,
                element: <CreateEventUserProblemType />,
                breadcrumb: "Новая связь",
            },
        ]
    },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
