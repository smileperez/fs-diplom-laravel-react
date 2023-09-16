import { Navigate, createBrowserRouter } from "react-router-dom";
// Layouts
import GuestLayout from "./components/GuestLayout";
import AuthLayout from "./components/AuthLayout";
import AdminLayout from "./components/AdminLayout";
// Admins
import Dashboard from "./views/admins/Dashboard";
import Halls from "./views/admins/Halls";
import ConfigHalls from "./views/admins/ConfigHalls";
import Prices from "./views/admins/Prices";
import Sessions from "./views/admins/Sessions";
import Users from "./views/admins/Users";
// Guests
import Tickets from "./views/guests/Tickets";
// Auth
import Login from "./views/auth/Login";
import Signup from "./views/auth/Signup";


const router = createBrowserRouter([
    {
        path: '/',
        element: <AdminLayout />,
        children: [
            {
                path: '/dashboard',
                element: <Navigate to="/dashboard" />
            },
            {
                path: '/',
                element: <Dashboard />
            },
            {
                path: '/halls',
                element: <Halls />
            },
            {
                path: '/confighalls',
                element: <ConfigHalls />
            },
            {
                path: '/prices',
                element: <Prices />
            },
            {
                path: '/sessions',
                element: <Sessions />
            },
            {
                path: '/users',
                element: <Users />
            },
        ]
    },

    {
        path: '/',
        element: <AuthLayout />,
        children: [
            {
                path: '/login',
                element: <Login />
            },
            {
                path: '/signup',
                element: <Signup />
            },
        ]
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/tickets',
                element: <Tickets />
            },
        ]
    },


])

export default router;
