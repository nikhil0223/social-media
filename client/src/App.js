import React from "react";
import {  RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from "./components/Login";
import Home from "./components/Home";
import Body from "./components/Body";
import './App.css';
import ProtectedRoute from "./Utils/ProtectedRoutes";
import ProfilePage from "./components/ProfilePage";
import ViewPage from "./components/ViewPage";

const appRouter = createBrowserRouter([
    {
        path: "/auth",
        element: <Login />
    },
    {
        path: "/",
        element: (
            <ProtectedRoute>
                <Body />
            </ProtectedRoute>
        ),
        children: [
            {
                path: "/",
                element: <Home />
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: "/view",
                element: <ViewPage />
            }
        ]
    }
]);

const App = () => {
    return (
        <RouterProvider router={appRouter} />
    );
};

export default App;