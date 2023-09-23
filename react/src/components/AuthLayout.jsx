import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import Logo from './Logo';

export default function AuthLayout() {

    const { currentUser, userToken } = useStateContext();

    if (userToken) {
        return <Navigate to='/admin/dashboard' />
    }

    return (
        <div className="mx-auto mt-[20%] w-[400px]">
            <header className="p-2 flex flex-col items-center bg-[#63536C]">
                <Logo />
            </header>
            <Outlet />
        </div>
    )
}
