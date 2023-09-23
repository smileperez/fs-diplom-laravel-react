import { Navigate, Outlet } from 'react-router-dom'
import { useStateContext } from '../context/ContextProvider'

export default function GuestLayout() {

    // const { currentUser, userToken } = useStateContext();

    // if (userToken) {
    //     return <Navigate to='/admin/dashboard' />
    // }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <h1 class="page-header__title">Идём<span>в</span>кино</h1>
          </div>

          <Outlet />
        </div>
    )
}
