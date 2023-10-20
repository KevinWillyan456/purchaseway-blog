import React from "react";
import ReactDOM from "react-dom/client";
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import SingIn from "./pages/SingIn";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
    },
    {
        path: "dashboard",
        element: <Dashboard />,
    },
    {
        path: "singin",
        element: <SingIn />,
    },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
);
