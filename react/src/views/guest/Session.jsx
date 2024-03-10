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

    // Для перенаправления на другую страницу
    const navigate = useNavigate();

    // Состояние для загрузки из БД сессии
    const [session, setSession] = useState();

    // Состояние для загрузки из БД фильма
    const [movie, setMovie] = useState();

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

    // Состояние для загрузки из БД сидушек
    const [seats, setSeats] = useState([]);

    // Состояние для хранения уже купленных мест другими пользователями
    const [reservedSeats, setReservedSeats] = useState([]);

    // Состояние для переключателя компонента
    const [toggleComponent, setToggleComponent] = useState(false);

    // Состояние для хранения общей стоимости билета
    const [totalPrices, setTotalPrices] = useState();

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

    //
    const getSeat = (seat_id) => {
        axiosClient
            .get(`/getseat/${seat_id}`)
            .then(({ data }) => {

                // Проверка, если сидушки уже записана, то не добавляем
                // if (seats.length < tickets.length) {
                setSeats(item => [...item, data[0]])
                // }
            });
    }

    // Функция получения уже купленных мест
    const getReservedSeats = (session_id, date) => {
        axiosClient
            .get(`/getticket/${session_id}/${date}`)
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

        navigate(`/ticket/${uuid}`)
    }

    const onClickToggle = () => {

        // Запрашиваем данные по сидушкам
        tickets.map(element => getSeat(element.id));

        // Если список выбранных мест НЕ нулевой, то показываем страницу бронирования.
        if (tickets.length !== 0) {
            setToggleComponent(true);
        }
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

    // Функция расчета стоимости билета
    const getTotalPrice = (seats, prices) => {
        let result = 0;
        console.log(seats);
        seats.forEach(item => {
            result += prices.find(element => element.types_id == item.types_id).price;
        })

        setTotalPrices(result);
    }

    // При каждом обновлении страницы обновляем данные
    useEffect(() => {
        getTotalPrice(seats, prices);
    }, [seats]);

    return (
        <section>

            {toggleComponent ?
                <>
                    <header className="py-6 px-4 bg-[#F1EBE6] opacity-95 rounded">
                        <span className="block uppercase text-2xl text-[#C76F00] font-bold">Вы выбрали билеты:</span>
                    </header>

                    <div className="p-4 mt-4 bg-[#F1EBE6] opacity-95 rounded-t">
                        <h2 className="flex mt-1">
                            <span className="block mr-1 text-base">На фильм:</span>
                            {movie ? <span className="font-medium">{movie.title}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                        </h2>

                        <p className="flex mt-1">
                            <span className="block mr-1">Дата:</span>
                            {session ? <span className="font-medium">{session.date}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                        </p>

                        <p className="flex mt-1">
                            <span className="block mr-1">Начало сеанса:</span>
                            {session ? <span className="font-medium">{session.sessionStart.slice(0, -3)}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                        </p>

                        <p className="flex mt-1">
                            <span className="block mr-1">В зале:</span>
                            {session ? <span className="font-medium">№{session.halls_id}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                        </p>

                        <p className="flex mt-1">
                            <span className="block mr-1">Места [ряд-место]:</span>
                            {tickets.length !== 0
                                ?
                                <span className="font-medium">{`${tickets.map(item => (` ${item.row}-${item.seat}`))}`}</span>
                                :
                                <span className="font-medium ml-1">Загрузка...</span>
                            }
                        </p>

                        <p className="flex mt-1">
                            <span className="block mr-1">Стоимость:</span>
                            {totalPrices ? <span className="font-medium">{totalPrices} ₽</span> : <span className="font-medium ml-1">Загрузка...</span>}
                        </p>
                    </div>

                    <div className="py-2 flex flex-col justify-center items-center bg-[#F1EBE6] rounded-b px-4 opacity-95 relative">
                        <EButton onClick={onClickReserve}>
                            <span className="uppercase text-base px-8">
                                Оплатить и получить код бронирования
                            </span>
                        </EButton>
                        <div className="flex flex-col">
                            <p className="mt-6">
                                После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.
                            </p>
                            <p>
                                Приятного просмотра!
                            </p>
                        </div>
                    </div>
                </>

                :

                <>
                    <div className="p-4 bg-[#F1EBE6] opacity-95 rounded-t">
                        <h2 className="text-lg font-medium">
                            {movie ? <span className="font-medium">{movie.title}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                        </h2>
                        <p className="flex mt-1">
                            {/* TODO: */}
                            <span className="block mr-1">Дата сеанса:</span>
                            {session ? <span className="font-medium">{session.sessionStart}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                        </p>
                        <p className="flex mt-1">
                            <span className="block mr-1">Начало сеанса:</span>
                            {session ? <span className="font-medium">{session.sessionStart}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                        </p>
                        <p className="flex mt-1 font-medium">
                            {session ? <span className="font-medium">Зал№{session?.halls_id} - {hall?.name}</span> : <span className="font-medium ml-1">Загрузка...</span>}
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

                    <div className="flex items-center justify-center p-8 bg-[#F1EBE6] opacity-95 rounded-b">
                        <EButton onClick={onClickToggle}>
                            <span className="uppercase text-base px-8">
                                Забронировать
                            </span>
                        </EButton>
                    </div>
                </>}
        </section>
    )
}
