import React from 'react';
import { Outlet } from "react-router-dom";

import Main from "./components/common/layout/main";

import './App.css';

const App = () => (
    <div className="App">
        <Main>
            <Outlet />
        </Main>
    </div>
);

export default App;
