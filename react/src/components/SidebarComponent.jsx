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
import { useState } from 'react'

export default function SidebarComponent({ currentUser }) {

    const navigation = [
        { name: 'Главная', icon: <StarIcon className='block w-6 h-7' />, to: '/admin/dashboard' },
        { name: 'Залы', icon: <SquaresPlusIcon className='block w-6 h-7' />, to: '/admin/halls' },
        { name: 'Конфигурации', icon: <AdjustmentsHorizontalIcon className='block w-6 h-7' />, to: '/admin/confighalls' },
        { name: 'Цены', icon: <CurrencyDollarIcon className='block w-6 h-7' />, to: '/admin/prices' },
        { name: 'Сеансы', icon: <CalendarDaysIcon className='block w-6 h-7' />, to: '/admin/sessions' },
        { name: 'Пользователи', icon: <UsersIcon className='block w-6 h-7' />, to: '/admin/users' },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const logout = (event) => {
        event.preventDefault();
        console.log("Logout");
    }

    const [open, setOpen] = useState(true);

    return (
        <div
            className={`${open ? 'w-[18rem]' : 'w-20'} duration-300 flex flex-col justify-between bg-[#63536C] text-white`}
        >
            <div className='flex justify-evenly items-center relative'>
                <div className={`${!open && 'invisible'} h-68 p-2 flex flex-col items-center`}>
                    <Logo />
                </div>
                <ChevronLeftIcon
                    className={`block w-10 h-10 bg-[#89639e] p-2 rounded-full absolute top-4 -right-5 border-2 border-gray-700 cursor-pointer ${!open && 'rotate-180'}`}
                    onClick={() => setOpen(!open)}
                />
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
                            <div className={`${!open && 'hidden'}`}>{item.name}</div>
                        </div>
                    </NavLink>
                ))}
            </div>

            <div className="px-4 flex justify-evenly">
                <div className={`${!open && 'hidden'} flex flex-col justify-evenly`}>
                    <div className="text-base font-medium leading-none text-white">{currentUser.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{currentUser.email}</div>
                </div>
                <UserIcon className='block w-10 h-10 p-2 rounded-full text-white cursor-pointer hover:bg-gray-700 active:bg-[#89639e]' />
            </div>

            <div className='p-4 flex'>
                <div
                    className="flex-1 text-red-300 hover:text-red-400 hover:bg-gray-700  text-lg px-3 py-2 space-x-3 font-medium inline-flex items-center focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center cursor-pointer active:bg-[#89639e] active:text-white"
                    onClick={(event) => logout(event)}
                >
                    <ArrowLeftOnRectangleIcon className='block w-6 h-7' />
                    <div className={`${!open && 'hidden'}`}>Выход</div>
                </div>
            </div>

        </div >
    )
}
