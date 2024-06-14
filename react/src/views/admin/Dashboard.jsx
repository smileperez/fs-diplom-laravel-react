import { useEffect, useState } from "react";
import PageComponent from "../../components/admin/PageComponent";
import {
    FilmIcon,
    SquaresPlusIcon,
    RectangleGroupIcon,
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
    const [tickets, setTickets] = useState([]);
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
                        <h1 className="text-5xl">
                            {11} ₽
                        </h1>
                        <span className="text-sm text-gray-700">Доход</span>
                    </div>
                    <div className="ml-8">
                        <SquaresPlusIcon className="block w-6 h-7" />
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

            <div className="mt-8">
                <div className="flex p-2 bg-white border-gray-400 border-2 rounded">
                    <div>
                        <span className="text-sm text-gray-700">Управление продажами</span>
                        <div className="flex flex-col gap-2">
                            {halls
                                .slice(0)
                                .reverse()
                                .map((hall) => (
                                    <DashboardHallListItem hall={hall} getHalls={getHalls} />
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </PageComponent >
    )
}
