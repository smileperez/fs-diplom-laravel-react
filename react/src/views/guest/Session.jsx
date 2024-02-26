import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import EButton from "../../components/core/EButton";
import MatrixComponentGuest from "../../components/guest/MatrixComponentGuest.jsx";
import axiosClient from "../../axios.js";

export default function Hall() {

    // Берем id сессии из под URL страницы (из роутера)
    const { id } = useParams();

    // Состояние для загрузки из БД сессии
    const [session, setSession] = useState();

    // Состояние для загрузки из БД фильма
    const [movie, setMovie] = useState();

    // Состояние для загрузки из БД зала
    const [hall, setHall] = useState();

    // Состояние для загрузки из БД матрицы сидушек
    const [matrix, setMatrix] = useState();

    // Состояние для хранения обновленной матрицы
    const [adjustedMatrix, setAdjustedMatrix] = useState();

    // Состояние для загрузки из БД всех типов мест
    const [types, setTypes] = useState();

    // Состояние для загрузки из БД цен сидушек для конкретного зала
    const [prices, setPrices] = useState();

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
    const getPrice = () => {
        axiosClient
            .get(`/getprices${hall_id}`)
            .then(({ data }) => {
                setMovie(data);
            });
    };

    // При каждом обновлении страницы обновляем данные
    useEffect(() => {
        getSession();
    }, []);

    // Функция бронирования выбранных мест
    const onClickReserve = () => {
        console.log('ТЫК');
    }

    return (
        <section className="bg-[#F1EBE6] rounded">
            <div>
                <h2 className="text-lg font-medium">
                    {movie?.title}
                </h2>
                <p>
                    {/* TODO: */}
                    Дата: {session?.sessionStart}
                </p>
                <p>
                    Начало сеанса: {session?.sessionStart}
                </p>
                <p>
                    Зал - №{session?.halls_id} {hall?.name}
                </p>
            </div>

            <div className="bg-[#171D24] text-white">

                <div className="flex flex-col justify-center items-center">
                    <span className="tracking-[1.25em] mt-10">
                        ЭКРАН
                    </span>
                    <div className="mb-10">
                        <MatrixComponentGuest
                            matrixSeats={matrix}
                            rows={hall?.rows}
                            seats={hall?.seats}
                            types={types}
                        // sendAdjustedMatrix={sendAdjustedMatrix}
                        />
                    </div>
                </div>



            </div>

            <div className="flex items-center justify-center my-10">
                <EButton
                    onClick={onClickReserve}>
                    ЗАБРОНИРОВАТЬ
                </EButton>
            </div>

        </section>
    )
}
