import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Home from './pages/Home'
import Dashboard from './pages/Dashboard'
import SingIn from './pages/SingIn'
import Login from './pages/Login'
import NotFound from './components/errorcomponents/notfound/NotFound'
import SomethingWrong from './components/errorcomponents/somethingwrong/SomethingWrong'

const router = createBrowserRouter([
    {
        path: '/',
        element: <Home />,
        errorElement: <NotFound />,
    },
    {
        path: 'dashboard',
        element: <Dashboard />,
        errorElement: <SomethingWrong />,
    },
    {
        path: 'singin',
        element: <SingIn />,
        errorElement: <SomethingWrong />,
    },
    {
        path: 'login',
        element: <Login />,
        errorElement: <SomethingWrong />,
    },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>
)
