import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";
import QRCode from "react-qr-code";
import load from '../../img/loading.gif';

export default function Ticket() {

    // UUID из URL страницы (из роутера)
    const { uuid } = useParams();

    // Состояние для загрузки из БД информации по билету
    const [ticket, setTicket] = useState([]);

    // Состояние для загрузки из БД сессии
    const [session, setSession] = useState();

    // Состояние для загрузки из БД фильма
    const [movie, setMovie] = useState();

    // Состояние для загрузки из БД сидушек
    const [seats, setSeats] = useState([]);

    // Соятоние загрузки данных
    const [loading, setLoading] = useState(false);

    // Функция получения билета
    const getTicket = () => {
        setLoading(true);
        axiosClient
            .get(`/getticket/${uuid}`)
            .then(({ data }) => {
                setTicket(data);
                getSession(data[0].sessions_id);
            });
    };

    // Функция получения конкретного зала
    const getSession = (session_id) => {
        axiosClient
            .get(`/getsession/${session_id}`)
            .then(({ data }) => {
                setSession(data[0]);
                getMovie(data[0].movies_id)
            });
    };

    // Функция получения всех сессий по конкретному залу
    const getMovie = (movie_id) => {
        axiosClient
            .get(`/getmovie/${movie_id}`)
            .then(({ data }) => {
                setMovie(data[0]);
                setLoading(false);
            });
    };

    //
    const getSeat = (seat_id) => {
        axiosClient
            .get(`/getseat/${seat_id}`)
            .then(({ data }) => {

                if (seats.find(item => item.id === data[0].id) === undefined) {
                    setSeats(item => [...item, data[0]])
                }

            });
    }

    // При каждом обновлении страницы обновляем данные
    useEffect(() => {
        getTicket();
    }, []);

    // При каждом обновлении страницы обновляем данные
    useEffect(() => {
        ticket.forEach(element => {
            getSeat(element.seats_id);
        });
    }, [ticket]);

    return (
        <>

            {loading && (
                <>
                    <header className="py-6 px-4 bg-[#F1EBE6] opacity-95 rounded">
                        <span className="block uppercase text-2xl text-[#C76F00] font-bold">Электронный билет</span>
                    </header>

                    <div className="p-4 mt-4 bg-[#F1EBE6] opacity-95 rounded">
                        <img src={load} alt="Загрузка данных" className="w-20 h-20 my-36 mx-auto" />
                    </div>
                </>
            )}

            {!loading && (
                <>
                    <header className="py-6 px-4 bg-[#F1EBE6] opacity-95 rounded">
                        <span className="block uppercase text-2xl text-[#C76F00] font-bold">Электронный билет</span>
                    </header>

                    <div className="p-4 mt-4 bg-[#F1EBE6] opacity-95 rounded-t">
                        <h2 className="flex mt-1">
                            <span className="block mr-1 text-base">На фильм:</span>
                            <span className="font-medium">{movie?.title}</span>
                        </h2>

                        <p className="flex mt-1">
                            <span className="block mr-1">Дата:</span>
                            <span className="font-medium">{ticket[0]?.date}</span>
                        </p>

                        <p className="flex mt-1">
                            <span className="block mr-1">Начало сеанса:</span>
                            <span className="font-medium">{session?.sessionStart.slice(0, -3)}</span>
                        </p>

                        <p className="flex mt-1">
                            <span className="block mr-1">В зале:</span>
                            <span className="font-medium">№{session?.halls_id}</span>
                        </p>

                        <p className="flex mt-1">
                            <span className="block mr-1">Места:</span>
                            {seats.length !== 0
                                ?
                                <span className="font-medium">{`${seats?.map(item => (` ${item.row}-${item.seat}`))}`}</span>
                                :
                                <span className="font-medium ml-1">Загрузка...</span>
                            }
                        </p>
                    </div>

                    <div className="py-2 flex flex-col bg-[#F1EBE6] rounded-b px-4 opacity-95">
                        <div style={{ height: "auto", margin: "0 auto", maxWidth: 256, width: "100%" }}>
                            <QRCode
                                size={1024}
                                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                                value={uuid}
                                viewBox={`0 0 512 512`}
                            />
                        </div>

                        <div className="flex flex-col items-start">
                            <p className="mt-4">
                                Покажите QR-код нашему контроллеру для подтверждения бронирования.
                            </p>
                            <p>
                                Приятного просмотра!
                            </p>
                        </div>
                    </div>

                </>
            )}

        </>
    )
}
