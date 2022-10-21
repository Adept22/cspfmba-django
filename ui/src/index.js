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
import FormEvent, { action as formEventAction, loader as formEventLoader } from './components/events/Form';
import DeleteEvent, { action as deleteEventAction } from './components/events/Delete';

import Users, { loader as usersLoader } from './components/users';
import FormUser, { action as formUserAction, loader as formUserLoader } from './components/users/Form';
import DeleteUser, { action as deleteUserAction } from './components/users/Delete';

import ProblemTypes, { loader as problemTypesLoader } from './components/problem-types';
import FormProblemType, { action as formProblemTypeAction, loader as formProblemTypeLoader } from './components/problem-types/Form';
import DeleteProblemType, { action as deleteProblemTypeAction } from './components/problem-types/Delete';

import EventUserProblemTypes, { loader as eventUserProblemTypesLoader } from './components/event-user-problem-types';
import FormEventUserProblemType, { action as formEventUserProblemTypeAction, loader as formEventUserProblemTypeLoader } from './components/event-user-problem-types/Form';
import CreateCombinationsEventUserProblemType, { action as createCombinationsEventUserProblemTypeAction } from './components/event-user-problem-types/CreateCombinations';
import DeleteEventUserProblemType, { action as deleteEventUserProblemTypeAction } from './components/event-user-problem-types/Delete';

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
                action: formEventAction,
                element: <FormEvent />,
                breadcrumb: "Новое событие",
            },
            {
                path: "events/:id/edit",
                action: formEventAction,
                loader: formEventLoader,
                element: <FormEvent />,
                breadcrumb: "Редактирование события",
            },
            {
                path: "events/:id/delete",
                action: deleteEventAction,
                element: <DeleteEvent />,
                breadcrumb: "Удалить событие",
            },
            {
                path: "users",
                loader: usersLoader,
                element: <Users />,
                breadcrumb: "Пользователи",
            },
            {
                path: "users/create",
                action: formUserAction,
                element: <FormUser />,
                breadcrumb: "Новый пользователь",
            },
            {
                path: "users/:id/edit",
                action: formUserAction,
                loader: formUserLoader,
                element: <FormUser />,
                breadcrumb: "Редактирование пользователя",
            },
            {
                path: "users/:id/delete",
                action: deleteUserAction,
                element: <DeleteUser />,
                breadcrumb: "Удалить пользователя",
            },
            {
                path: "problem-types",
                loader: problemTypesLoader,
                element: <ProblemTypes />,
                breadcrumb: "Типы проблем",
            },
            {
                path: "problem-types/create",
                action: formProblemTypeAction,
                element: <FormProblemType />,
                breadcrumb: "Новый тип проблемы",
            },
            {
                path: "problem-types/:id/edit",
                action: formProblemTypeAction,
                loader: formProblemTypeLoader,
                element: <FormProblemType />,
                breadcrumb: "Редактирование типа проблемы",
            },
            {
                path: "problem-types/:id/delete",
                action: deleteProblemTypeAction,
                element: <DeleteProblemType />,
                breadcrumb: "Удалить тип проблемы",
            },
            {
                path: "event-user-problem-types",
                loader: eventUserProblemTypesLoader,
                element: <EventUserProblemTypes />,
                breadcrumb: "Связи",
            },
            {
                path: "event-user-problem-types/create",
                action: formEventUserProblemTypeAction,
                element: <FormEventUserProblemType />,
                breadcrumb: "Новая связь",
            },
            {
                path: "event-user-problem-types/create-combinations",
                action: createCombinationsEventUserProblemTypeAction,
                element: <CreateCombinationsEventUserProblemType />,
                breadcrumb: "Новая связь",
            },
            {
                path: "event-user-problem-types/:id/edit",
                action: formEventUserProblemTypeAction,
                loader: formEventUserProblemTypeLoader,
                element: <FormEventUserProblemType />,
                breadcrumb: "Редактирование связи",
            },
            {
                path: "event-user-problem-types/:id/delete",
                action: deleteEventUserProblemTypeAction,
                element: <DeleteEventUserProblemType />,
                breadcrumb: "Удалить связь",
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
