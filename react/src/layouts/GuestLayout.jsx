import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import { Link } from 'react-router-dom'
import LogoComponent from '../components/LogoComponent'

export default function GuestLayout() {

    return (
        <>
            <header className="p-2 flex flex-col items-center bg-[#63536C]">
                <LogoComponent />
            </header>
            <Outlet />
        </>
    )
}
