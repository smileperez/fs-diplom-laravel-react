import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EButton from "../../components/core/EButton";
import MatrixComponentGuest from "../../components/guest/MatrixComponentGuest.jsx";
import axiosClient from "../../axios.js";

export default function Hall() {

    // Берем id сессии из под URL страницы (из роутера)
    const { uuid } = useParams();

    // Состояние для загрузки из БД информации по билету
    const [tickets, setTickets] = useState([]);

    // Состояние для загрузки из БД сессии
    const [session, setSession] = useState([]);

    // Состояние для загрузки из БД фильма
    const [movie, setMovie] = useState([]);

    // Состояние для загрузки из БД цен сидушек для конкретного зала
    const [prices, setPrices] = useState([]);

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения билета
    const getTicket = () => {
        // axiosClient
        //     .get(`/getsession/${id}`)
        //     .then(({ data }) => {
        //         setSession(data[0]);
        //         getMovie(data[0].movies_id);
        //         getHall(data[0].halls_id);
        //         getMatrix(data[0].halls_id);
        //         getTypes();
        //         getPrice(data[0].halls_id);
        //         getReservedSeats(data[0].id, "2024-02-28");
        //     });
    };

    // Функция получения всех сессий по конкретному залу
    const getMovie = (movie_id) => {
        // axiosClient
        //     .get(`/getmovie/${movie_id}`)
        //     .then(({ data }) => {
        //         setMovie(data[0]);
        //     });
    };

    // Функция получения конкретного зала
    const getHall = (hall_id) => {
        // axiosClient
        //     .get(`/gethall/${hall_id}`)
        //     .then(({ data }) => {
        //         setHall(data[0]);
        //     });
    };

    // Функция получения матрицы сидушек конкретного зала
    const getMatrix = (hall_id) => {
        // axiosClient
        //     .get(`/getseats/${hall_id}`)
        //     .then(({ data }) => {
        //         setMatrix(data);
        //     });
    };

    // Функция получения цен сидушек по конкретному залу
    const getTypes = () => {
        // axiosClient
        //     .get(`/gettypes`)
        //     .then(({ data }) => {
        //         setTypes(data.data);
        //     });
    };

    // Функция получения цен сидушек по конкретному залу
    const getPrice = (hall_id) => {
        // axiosClient
        //     .get(`/getprices/${hall_id}`)
        //     .then(({ data }) => {
        //         setPrices(data);
        //     });
    };

    // При каждом обновлении страницы обновляем данные
    // useEffect(() => {
    //     getSession();
    // }, []);

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
                <span className="block text-base">На фильм: Звёздные войны XXIII: Атака клонированных клонов</span>
                <span className="block mt-1">Места: 6, 7</span>
                <span className="block mt-1">В зале: 1</span>
                <span className="block mt-1">Начало сеанса: 18:30</span>
                <span className="block mt-1">Стоимость: 600 рублей</span>
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
