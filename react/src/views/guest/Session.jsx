import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import EButton from "../../components/core/EButton";
import MatrixComponentGuest from "../../components/guest/MatrixComponentGuest.jsx";
import { v4 as uuidv4 } from 'uuid';
import axiosClient from "../../axios.js";

export default function Hall() {

    // Берем id сессии из под URL страницы (из роутера)
    const { id } = useParams();

    // Состояние для загрузки из БД сессии
    const [session, setSession] = useState([]);

    // Состояние для загрузки из БД фильма
    const [movie, setMovie] = useState([]);

    // Состояние для загрузки из БД зала
    const [hall, setHall] = useState([]);

    // Состояние для загрузки из БД матрицы сидушек
    const [matrix, setMatrix] = useState([]);

    // Состояние для загрузки из БД всех типов мест
    const [types, setTypes] = useState();

    // Состояние для загрузки из БД цен сидушек для конкретного зала
    const [prices, setPrices] = useState([]);

    // Состояние для хранения выбранных пользователем мест
    const [tickets, setTickets] = useState([]);

    // Состояние для хранения выбранных пользователем мест
    const [reservedSeats, setReservedSeats] = useState([]);

    const navigate = useNavigate();

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения конкретной сессии
    const getSession = () => {
        axiosClient
            .get(`/getsession/${id}`)
            .then(({ data }) => {
                setSession(data[0]);
                getMovie(data[0].movies_id);
                getHall(data[0].halls_id);
                getMatrix(data[0].halls_id);
                getTypes();
                getPrice(data[0].halls_id);
                getReservedSeats(data[0].id, "2024-02-28");
            });
    };

    // Функция получения всех сессий по конкретному залу
    const getMovie = (movie_id) => {
        axiosClient
            .get(`/getmovie/${movie_id}`)
            .then(({ data }) => {
                setMovie(data[0]);
            });
    };

    // Функция получения конкретного зала
    const getHall = (hall_id) => {
        axiosClient
            .get(`/gethall/${hall_id}`)
            .then(({ data }) => {
                setHall(data[0]);
            });
    };

    // Функция получения матрицы сидушек конкретного зала
    const getMatrix = (hall_id) => {
        axiosClient
            .get(`/getseats/${hall_id}`)
            .then(({ data }) => {
                setMatrix(data);
            });
    };

    // Функция получения цен сидушек по конкретному залу
    const getTypes = () => {
        axiosClient
            .get(`/gettypes`)
            .then(({ data }) => {
                setTypes(data.data);
            });
    };

    // Функция получения цен сидушек по конкретному залу
    const getPrice = (hall_id) => {
        axiosClient
            .get(`/getprices/${hall_id}`)
            .then(({ data }) => {
                setPrices(data);
            });
    };

    // Функция получения цен сидушек по конкретному залу
    const getReservedSeats = (session_id, date) => {
        axiosClient
            .get(`/tickets/${session_id}/${date}`)
            .then(({ data }) => {
                setReservedSeats(data);
            });
    };

    // При каждом обновлении страницы обновляем данные
    useEffect(() => {
        getSession();
    }, []);

    // Функция бронирования выбранных мест tikets
    const onClickReserve = () => {
        // Уникальный идентифкатор билета
        const uuid = uuidv4();

        const payload = [];
        for (let i = 0; i < tickets.length; i++) {
            payload.push({
                uuid: uuid,
                date: "2024-02-28",
                sessions_id: session.id,
                seats_id: tickets[i].id
            })
        }

        payload.map(item => {
            console.log(item);
            axiosClient
                .post("/tickets", item)
                .catch((err) => {
                    if (err && err.response) {
                        // Записываем error в состояние
                        setError(err.response.data.message);
                    }
                    console.log(err, err.response);
                });
        })

        navigate(`/payment/${uuid}`)
    }

    // Call-back функция для получения координат сидушек и состояния toggle
    const sendCoord = (coord, toggle) => {
        // Если toggle, то записываем в состояние сидушку
        if (toggle === true) {
            setTickets(item => [...item, coord])
        } else {
            setTickets(tickets.filter(item => item.id !== coord.id))
        }
    }

    return (
        <section className="rounded ">
            <div className="p-4 bg-[#F1EBE6] opacity-95">
                <h2 className="text-lg font-medium">
                    {movie?.title}
                </h2>
                <p>
                    {/* TODO: */}
                    Дата сеанса: {session?.sessionStart}
                </p>
                <p>
                    Начало сеанса: {session?.sessionStart}
                </p>
                <p className="font-medium">
                    Зал№{session?.halls_id} - {hall?.name}
                </p>
            </div>

            <div className="bg-[#171D24] text-white">

                <div className="flex flex-col justify-center items-center px-8 pt-8">
                    <span className="tracking-[1.25em] text-xs">
                        ЭКРАН
                    </span>
                    <div className="">
                        <MatrixComponentGuest
                            matrixSeats={matrix}
                            rows={hall?.rows}
                            seats={hall?.seats}
                            types={types}
                            sendCoord={sendCoord}
                            reservedSeats={reservedSeats}
                        />
                    </div>
                    <div className="grid grid-rows-2 grid-flow-col gap-x-20 gap-y-3 my-8">
                        <div className="flex">
                            <div className="w-[24px] h-[24px] bg-[#63536C] border border-gray-400 rounded-md"></div>
                            <span className="ml-2">Свободно ({prices[0]?.price} ₽)</span>
                        </div>
                        <div className="flex">
                            <div className="w-[24px] h-[24px] bg-[#FFD700] border border-gray-400 rounded-md"></div>
                            <span className="ml-2">Свободно VIP ({prices[1]?.price} ₽)</span>
                        </div>
                        <div className="flex">
                            <div className="w-[24px] h-[24px] bg-[#] border border-gray-400 rounded-md"></div>
                            <span className="ml-2">Занято</span>
                        </div>
                        <div className="flex">
                            <div className="w-[24px] h-[24px] bg-[#25C4CE] border border-gray-400 rounded-md"></div>
                            <span className="ml-2">Выбрано</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex items-center justify-center p-8 bg-[#F1EBE6] opacity-95">
                <EButton onClick={onClickReserve}>
                    <span className="uppercase text-base px-8">
                        Забронировать
                    </span>
                </EButton>
            </div>

        </section>
    )
}
