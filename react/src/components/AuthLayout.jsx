import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'

export default function AuthLayout() {

    const { currentUser, userToken } = useStateContext();

    if (userToken) {
        return <Navigate to='/' />
    }

    return (
        <div className="flex min-h-full flex-col justify-center mx-24 my-12 lg:px-8 bg-[#63536C]">
            <div className="p-2 flex flex-col items-center">
                <h1 className="logo-head-01">
                    ИДЁМ
                    <span className="logo-head-02">В</span>
                    КИНО
                </h1>
                <h2 className="logo-head-03">Администраторская</h2>
            </div>

            <Outlet />
        </div>
    )
}
