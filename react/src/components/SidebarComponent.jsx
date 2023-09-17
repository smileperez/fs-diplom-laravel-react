import { NavLink } from 'react-router-dom'
import { UserIcon } from '@heroicons/react/24/outline'

export default function SidebarComponent({ currentUser }) {

    const navigation = [
        { name: 'Главная', to: '/' },
        { name: 'Залы', to: '/halls' },
        { name: 'Конфигурации', to: '/confighalls' },
        { name: 'Цены', to: '/prices' },
        { name: 'Сеансы', to: '/sessions' },
        { name: 'Пользователи', to: '/users' },
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    const logout = (event) => {
        event.preventDefault();
        console.log("Logout");
    }

    return (
        <div className="flex flex-col justify-between bg-[#63536C] min-w-[17rem] text-white">
            <div className="p-2 flex flex-col items-center">
                <h1 className="logo-head-01">
                    ИДЁМ
                    <span className="logo-head-02">В</span>
                    КИНО
                </h1>
                <h2 className="logo-head-03">Администраторская</h2>
            </div>

            <div className="flex-1 flex flex-col">
                {navigation.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.to}
                        className={({ isActive }) => classNames(
                            isActive
                                ? 'bg-[#89639e] text-white'
                                : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                    >
                        {item.name}
                    </NavLink>
                ))}
            </div>


            <div className="p-4 relative flex justify-evenly">
                <div className="flex flex-col justify-evenly">
                    <div className="text-base font-medium leading-none text-white">{currentUser.name}</div>
                    <div className="text-sm font-medium leading-none text-gray-400">{currentUser.email}</div>
                </div>
                <UserIcon className='block w-10 h-10 bg-black/25 p-2 rounded-full text-white' />
            </div>
        </div>
    )
}
