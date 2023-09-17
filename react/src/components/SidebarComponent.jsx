import { NavLink } from 'react-router-dom'
import {
    UserIcon,
    ChevronLeftIcon,
    SquaresPlusIcon,
    CalendarDaysIcon,
    UsersIcon,
    AdjustmentsHorizontalIcon,
    StarIcon, CurrencyDollarIcon,
    ArrowLeftOnRectangleIcon
} from '@heroicons/react/24/outline'

export default function SidebarComponent({ currentUser }) {

    const navigation = [
        { name: 'Главная', icon: <StarIcon className='block w-6 h-6' />, to: '/' },
        { name: 'Залы', icon: <SquaresPlusIcon className='block w-6 h-6' />, to: '/halls' },
        { name: 'Конфигурации', icon: <AdjustmentsHorizontalIcon className='block w-6 h-6' />, to: '/confighalls' },
        { name: 'Цены', icon: <CurrencyDollarIcon className='block w-6 h-6' />, to: '/prices' },
        { name: 'Сеансы', icon: <CalendarDaysIcon className='block w-6 h-6' />, to: '/sessions' },
        { name: 'Пользователи', icon: <UsersIcon className='block w-6 h-6' />, to: '/users' },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const logout = (event) => {
        event.preventDefault();
        console.log("Logout");
    }

    return (
        <div className="flex flex-col justify-between bg-[#63536C] min-w-[18rem] text-white">
            <div className='flex justify-evenly items-center'>
                <div className="p-2 flex flex-col items-center">
                    <h1 className="logo-head-01">
                        ИДЁМ
                        <span className="logo-head-02">В</span>
                        КИНО
                    </h1>
                    <h2 className="logo-head-03">Администраторская</h2>
                </div>
                <ChevronLeftIcon className='block w-12 h-12 bg-black/25 p-2 rounded-full' />
            </div>


            <div className="flex-1 flex flex-col p-4 space-y-3">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.to}
                        icon={item.icon}
                        className={({ isActive }) => classNames(
                            isActive
                                ? 'bg-[#89639e] text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                    >
                        <div className='flex items-center text-lg space-x-3'>
                            <div>{item.icon}</div>
                            <div>{item.name}</div>
                        </div>
                    </NavLink>
                ))}
            </div>

            <div className="px-4 flex justify-evenly">
                <div className="flex flex-col justify-evenly">
                    <div className="text-base font-medium leading-none text-white">{currentUser.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{currentUser.email}</div>
                </div>
                <UserIcon className='block w-10 h-10 bg-black/25 p-2 rounded-full text-white' />
            </div>

            <div className='p-4 flex'>
                <div
                    className="flex-1 text-red-300 hover:text-red-400 hover:bg-gray-700 text-lg px-3 py-2 space-x-3 font-medium inline-flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center cursor-pointer"
                    onClick={(event) => logout(event)}
                >
                    <ArrowLeftOnRectangleIcon className='block w-6 h-6' />
                    <div>Выход</div>
                </div>
            </div>

        </div >
    )
}
