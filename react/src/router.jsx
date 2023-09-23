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
import Signin from "./views/auth/Signin";
import Signup from "./views/auth/Signup";


const router = createBrowserRouter([
    {
        path: '/admin',
        element: <AdminLayout />,
        children: [
            // {
            //     path: '/dashboard',
            //     element: <Navigate to="/dashboard" />
            // },
            {
                path: '/admin/dashboard',
                element: <Dashboard />
            },
            {
                path: '/admin/halls',
                element: <Halls />
            },
            {
                path: '/admin/confighalls',
                element: <ConfigHalls />
            },
            {
                path: '/admin/prices',
                element: <Prices />
            },
            {
                path: '/admin/sessions',
                element: <Sessions />
            },
            {
                path: '/admin/users',
                element: <Users />
            },
        ]
    },

    {
        path: '/',
        element: <GuestLayout />,
        children: [
            {
                path: '/',
                element: <Tickets />
            },
        ]
    },

    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/signin',
                element: <Signin />
            },
            {
                path: '/auth/signup',
                element: <Signup />
            },
        ]
    },


])

export default router;
