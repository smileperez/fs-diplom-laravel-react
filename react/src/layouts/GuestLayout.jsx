import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'
import { Link } from 'react-router-dom'
import LogoComponent from '../components/LogoComponent'

export default function GuestLayout() {

    return (
        <div className='h-screen bg-guest bg-cover'>
            <div className='mx-auto w-[900px]'>
                <header className='p-4 flex flex-col'>
                    <LogoComponent />
                </header>
                <Outlet />
            </div>
        </div>
    )
}
