import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EButton from "../../components/core/EButton";
import MatrixComponentGuest from "../../components/guest/MatrixComponentGuest.jsx";
import axiosClient from "../../axios.js";

export default function Hall() {

    // Берем id сессии из под URL страницы (из роутера)
    const { uuid } = useParams();

    // Состояние для загрузки из БД информации по билету
    const [ticket, setTicket] = useState();

    // Состояние для загрузки из БД сессии
    const [session, setSession] = useState();

    // Состояние для загрузки из БД
    const [seats, setSeats] = useState([]);

    // Состояние для загрузки из БД фильма
    const [movie, setMovie] = useState();

    // Состояние для загрузки из БД цен сидушек для конкретного зала
    const [prices, setPrices] = useState([]);

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения билета
    const getTicket = () => {
        axiosClient
            .get(`/getticket/${uuid}`)
            .then(({ data }) => {
                setTicket(data);
                getSession(data[0].sessions_id);
                data.forEach(element => {
                    getSeat(element.seats_id)
                });
            });
    };

    // Функция получения конкретного зала
    const getSession = (session_id) => {
        axiosClient
            .get(`/getsession/${session_id}`)
            .then(({ data }) => {
                setSession(data[0]);
                getPrice(data[0].halls_id);
                getMovie(data[0].movies_id)
            });
    };

    //
    const getSeat = (seat_id) => {
        axiosClient
            .get(`/getseat/${seat_id}`)
            .then(({ data }) => {

                // Проверка, если сидушки уже записана, то не добавляем
                if (seats.length < ticket.length) {
                    setSeats(item => [...item, data[0]])
                }
            });
    }

    // Функция получения цен сидушек по конкретному залу
    const getPrice = (hall_id) => {
        axiosClient
            .get(`/getprices/${hall_id}`)
            .then(({ data }) => {
                setPrices(data);
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

    const total = () => {
        let result = 0;
        seats.forEach(item => {
            result += prices.find(element => element.types_id == item.types_id).price;
        })
        return result;
    }


    // При каждом обновлении страницы обновляем данные
    useEffect(() => {
        getTicket();
    }, []);

    // Функция бронирования выбранных мест tikets
    const onClick = () => {
        // // Уникальный идентифкатор билета
        // const uuid = uuidv4();

        // const payload = [];
        // for (let i = 0; i < tickets.length; i++) {
        //     payload.push({
        //         uuid: uuid,
        //         date: "2024-02-28",
        //         sessions_id: session.id,
        //         seats_id: tickets[i].id
        //     })
        // }

        // payload.map(item => {
        //     console.log(item);
        //     axiosClient
        //         .post("/tickets", item)
        //         .catch((err) => {
        //             if (err && err.response) {
        //                 // Записываем error в состояние
        //                 setError(err.response.data.message);
        //             }
        //             console.log(err, err.response);
        //         });
        // })

        // navigate(`/payment/${uuid}`)
    }

    return (
        <section className="bg-[#F1EBE6] rounded px-4 opacity-95">
            <header className="py-6 uppercase text-2xl text-[#C76F00] font-bold">
                Вы выбрали билеты:
            </header>

            <div className="py-2 text-base">
                <div className="flex mt-1">
                    <span className="block text-base">На фильм:</span>
                    <span className="font-medium ml-1"></span>
                    {movie ? <span className="font-medium">{movie.title}</span> : <span className="font-medium ml-1">Загрузка...</span>}

                </div>

                <div className="flex mt-1">
                    <span className="block mr-1">Дата:</span>
                    {ticket ? <span className="font-medium">{ticket[0].date}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                </div>

                <div className="flex mt-1">
                    <span className="block mr-1">Начало сеанса:</span>
                    {session ? <span className="font-medium">{session.sessionStart.slice(0, -3)}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                </div>

                <div className="flex mt-1">
                    <span className="block mr-1">В зале:</span>
                    {session ? <span className="font-medium">№{session.halls_id}</span> : <span className="font-medium ml-1">Загрузка...</span>}
                </div>

                <div className="flex mt-1">
                    <span className="block mr-1">Места:</span>
                    {ticket ? ticket.map(item => (<span key={item.seats_id} className="font-medium">{item.seats_id}, </span>)) : <span className="font-medium ml-1">Загрузка...</span>}
                </div>


                <div className="flex mt-1">
                    <span className="block mr-1">Стоимость:</span>
                    {seats && prices ? <span className="font-medium">{total()} ₽</span> : <span className="font-medium ml-1">Загрузка...</span>}
                </div>

            </div>

            <div className="py-2 flex flex-col items-center justify-center">
                <EButton onClick={onClick}>
                    <span className="uppercase text-base px-8">
                        Получить код бронирования
                    </span>
                </EButton>
                <p className="mt-6">
                    После оплаты билет будет доступен в этом окне, а также придёт вам на почту. Покажите QR-код нашему контроллёру у входа в зал.
                </p>
                <p>
                    Приятного просмотра!
                </p>
            </div>

        </section>
    )
}
