import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import { Link } from 'react-router-dom'
import LogoComponent from '../components/LogoComponent'

export default function GuestLayout() {

    return (
        <div className="h-screen bg-guest bg-cover">
            <header className="p-2 flex flex-col items-center">
                <LogoComponent />
            </header>
            <Outlet />
        </div>
    )
}
