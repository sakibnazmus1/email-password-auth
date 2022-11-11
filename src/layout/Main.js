import React from 'react';
import { Outlet, Link } from 'react-router-dom';
const Main = () => {
    return (
        <div>
            <h3><small>My Email Password Authentication</small></h3>
            <Outlet></Outlet>
        </div>
    );
};

export default Main;