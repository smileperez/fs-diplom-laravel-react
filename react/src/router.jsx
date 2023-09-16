import { createBrowserRouter } from "react-router-dom";
import Dashboard from "./views/Dashboard";
import Tickets from "./views/Tickets";
import Login from "./views/Login";
import Signup from "./views/Signup";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Dashboard />
    },
    {
        path: '/tickets',
        element: <Tickets />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/signup',
        element: <Signup />
    },
])

export default router;