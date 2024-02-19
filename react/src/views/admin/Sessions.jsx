import PageComponent from "../../components/admin/PageComponent";
import SelectMenusComponent from "../../components/core/SelectMenusComponent";
import MovieItemSessions from "../../components/admin/MovieItemSessions.jsx";
import SessionItem from "../../components/admin/SessionItem.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";

export default function Sessions() {
    // Состояние для загрузки из БД общего списка фильмов
    const [movies, setMovies] = useState([]);

    // Состояние для загрузки залов из БД
    const [halls, setHalls] = useState([]);

    // Состояние для выбора конкретного зала
    const [hall, setHall] = useState();

    // Состояние для загрузки из БД общего списка интервалов
    const [sessions, setSessions] = useState();

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения списка залов из БД
    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/halls")
            .then(({ data }) => {
                setHalls(data.data);
                getMovies();
            });
    }, []);

    useEffect(() => {
        if (hall) {
            getSessions();
        }
    }, [hall]);


    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getMovies = () => {
        axiosClient.get(`/movies`)
            .then(({ data }) => {
                setMovies(data.data);
                setLoading(false);
            });
    };

    // callback функция, для получения выбранного зала из под компонента <SelectMenusComponent>
    const selectedHall = (hall) => {
        setHall(hall);
    };

    const getSessions = () => {
        axiosClient.get(`/sessions/${hall.id}`)
            .then(({ data }) => {
                setSessions(data);
            });
    }

    // TODO:
    const sessionsByTime = sessions?.forEach(element => {
        // element.map(session => console.log(session))
        console.log(Object.entries(element))
    });

    // const sessionsByTime = sessions?.sort((a, b) => Number(a.sessionStart.replace(":", ''))-Number(b.sessionStart.replace(":", '')))

    // const sessionsByTime = () => {
    //     sessions?.forEach(element => {element.sessionStart = element.sessionStart.slice(0, -3).replace(":", '')})

    // }

    return (
        <PageComponent title="Управление сеансами">
            <>

                {loading && (
                    <div className="text-center text-lg">Загрузка данных...</div>
                )}

                {!loading && (
                    <>
                        <div>
                            <h2 className="font-semibold">
                                Выберите доступный зал для настройки сеансов:
                            </h2>
                            <SelectMenusComponent
                                selectedHall={selectedHall}
                                items={halls}
                            />
                        </div>
                        {!hall && (
                            <div className="block text-base font-medium text-red-700 mt-5">
                                Для отображения сетки сеансов выберите зал!
                            </div>
                        )}
                        {hall && (
                            <>
                                <div className="justify-center items-center my-5">
                                    <div className="justify-center items-center my-3 font-medium">
                                        <span>Сетка сеансов для зала </span>
                                        <span className="bg-[#63536C] px-1 text-center inline-block text-white rounded text-sm border border-gray-500 font-medium">№{hall.id} - {hall.name}</span>
                                        <span> :</span>
                                    </div>

                                    <div className="flex border-2 border-[#63536C] rounded p-3">
                                        {sessions?.map((session) => (
                                            <SessionItem
                                                session={session}
                                                movies={movies}
                                                key={session.id}
                                            />
                                        ))}

                                        {
                                            console.log(sessionsByTime)
                                        }
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    {movies?.slice(0).reverse().map((movie) => (
                                        <MovieItemSessions
                                            movie={movie}
                                            hall={hall}
                                            getMovies={getMovies}
                                            key={movie.id}
                                        />
                                    ))}
                                </div>
                            </>
                        )}

                    </>

                )}
            </>
        </PageComponent>
    )
}
