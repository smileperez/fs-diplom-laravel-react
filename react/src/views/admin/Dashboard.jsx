import { useEffect, useState } from "react";
import PageComponent from "../../components/admin/PageComponent";
import {
    FilmIcon,
    SquaresPlusIcon,
    RectangleGroupIcon,
    CurrencyDollarIcon,
    ArrowTrendingUpIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../../axios.js";
import EButton from "../../components/core/EButton.jsx";
import DashboardHallListItem from "../../components/admin/DashboardHallListItem.jsx";

export default function Dashboard() {

    const [halls, setHalls] = useState([]);
    const [vipSeats, setVipSeats] = useState();
    const [defaultSeats, setDefaultSeats] = useState();
    const [reservedVipSeats, setReservedVipSeats] = useState();
    const [reservedDefaultSeats, setReservedDefaultSeats] = useState();
    const [movies, setMovies] = useState([]);
    const [profit, setProfit] = useState();
    const [loading, setLoading] = useState(false);

    const getData = () => {
        setLoading(true);
        axiosClient
            .get('/getmovies')
            .then(({ data }) => {
                setMovies(data.data);
                getHalls();
            });
    };

    const getHalls = () => {
        axiosClient
            .get('/gethalls')
            .then(({ data }) => {
                setHalls(data.data);
                getCountSeats();
                getCountReservedSeats();
                gerProfit();
            });
    };

    const getCountSeats = () => {
        axiosClient
            .get('/seats/default')
            .then(({ data }) => {
                setDefaultSeats(data);
            });
        axiosClient
            .get('/seats/vip')
            .then(({ data }) => {
                setVipSeats(data);
            });
    };

    const getCountReservedSeats = () => {
        axiosClient
            .get('/tickets/default')
            .then(({ data }) => {
                setReservedDefaultSeats(data);
            });
        axiosClient
            .get('/tickets/vip')
            .then(({ data }) => {
                setReservedVipSeats(data);
            });
        setLoading(false);
    };

    const gerProfit = () => {
        axiosClient
            .get('/tickets/profit')
            .then(({ data }) => {
                setProfit(data);
            });
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <PageComponent title="Панель управления">
            <div className="grid grid-cols-2 gap-8">
                <div className="flex justify-between p-2 bg-[#63536C] text-white rounded">
                    <div>
                        <h1 className="text-3xl">
                            {movies.length} шт.
                        </h1>
                        <span className="text-sm text-gray-300">Фильмы</span>
                    </div>
                    <div className="ml-8">
                        <FilmIcon className="block w-6 h-7" />
                    </div>
                </div>

                <div className="flex justify-between p-2 bg-[#FFD700] text-black rounded row-span-2">
                    <div className="flex flex-col justify-center">
                        <h1 className="text-4xl">
                            {profit} ₽
                        </h1>
                        <span className="text-sm text-gray-700">Доход</span>
                    </div>
                    <div className="ml-8">
                        <ArrowTrendingUpIcon className="block w-6 h-7" />
                    </div>
                </div>

                <div className="flex justify-between p-2 bg-[#63536C] text-white rounded">
                    <div>
                        <h1 className="text-3xl">
                            {halls.length} шт.
                        </h1>
                        <span className="text-sm text-gray-300">Залы</span>
                    </div>
                    <div className="ml-8">
                        <RectangleGroupIcon className="block w-6 h-7" />
                    </div>
                </div>

                <div className="flex justify-between p-2 bg-gray-700 text-white rounded">
                    <div>
                        <h1 className="text-3xl">
                            {defaultSeats ? defaultSeats.length : 0}
                        </h1>
                        <span className="text-sm text-gray-300">Количество обычных мест</span>
                    </div>
                    <div className="ml-8">
                        <SquaresPlusIcon className="block w-6 h-7" />
                    </div>
                </div>

                <div className="flex justify-between p-2 bg-[#89639e] text-white rounded">
                    <div>
                        <h1 className="text-3xl">
                            {vipSeats ? vipSeats.length : 0}
                        </h1>
                        <span className="text-sm text-gray-300">Количество VIP мест</span>
                    </div>
                    <div className="ml-8">
                        <SquaresPlusIcon className="block w-6 h-7" />
                    </div>
                </div>

                <div className="flex justify-between p-2 bg-gray-700 text-white rounded">
                    <div>
                        <h1 className="text-3xl">
                            {reservedDefaultSeats ? reservedDefaultSeats.length : 0}
                        </h1>
                        <span className="text-sm text-gray-300">Забронированные обычные места</span>
                    </div>
                    <div className="ml-8">
                        <SquaresPlusIcon className="block w-6 h-7" />
                    </div>
                </div>

                <div className="flex justify-between p-2 bg-[#89639e] text-white rounded">
                    <div>
                        <h1 className="text-3xl">
                            {reservedVipSeats ? reservedVipSeats.length : 0}
                        </h1>
                        <span className="text-sm text-gray-300">Забронированные VIP места</span>
                    </div>
                    <div className="ml-8">
                        <SquaresPlusIcon className="block w-6 h-7" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="flex p-2 bg-white border-gray-400 border-2 rounded">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 border-b-2 border-gray-500">
                            <tr className="text-nowrap text-center">
                                <th className="px-3 py-2">ID</th>
                                <th className="px-3 py-2">Зал</th>
                                <th className="px-3 py-2">Действие</th>
                            </tr>
                        </thead>

                        <tbody>
                            {halls.slice(0).reverse().map((hall) => (
                                <tr className="bg-white dark:bg-gray-800 dark:border-gray-700 text-nowrap text-center">
                                    <td className="px-3 py-3">{hall.id}</td>
                                    <td className="px-3 py-3">{hall.name}</td>
                                    <td className="px-3 py-3 flex justify-center">
                                        <DashboardHallListItem hall={hall} getHalls={getHalls} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div>

                </div>
            </div>
        </PageComponent >
    )
}
