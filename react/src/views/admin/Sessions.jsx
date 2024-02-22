import PageComponent from "../../components/admin/PageComponent";
import SelectMenusComponent from "../../components/core/SelectMenusComponent";
import getSessionInMinutes from "../../components/core/getSessionInMinutes.jsx";
import MovieItemSessions from "../../components/admin/MovieItemSessions.jsx";
import SessionItem from "../../components/admin/SessionItem.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";
import ETimeline from "../../components/core/ETimeline";

export default function Sessions() {
    // Состояние для загрузки из БД общего списка фильмов
    const [movies, setMovies] = useState([]);

    // Состояние для загрузки залов из БД
    const [halls, setHalls] = useState([]);

    // Состояние для выбора конкретного зала
    const [hall, setHall] = useState();

    // Состояние для отрисовки временной шкалы
    const [timeline, setTimeline] = useState([
        60, 120, 180, 240, 300, 360, 420, 480, 540, 600, 660, 720, 780, 840,
        900, 960, 1020, 1080, 1140, 1200, 1260, 1320, 1380, 1500, 1560
    ]);

    // Состояние для загрузки из БД общего списка интервалов
    const [sessions, setSessions] = useState();

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения списка залов из БД
    useEffect(() => {
        setLoading(true);
        axiosClient.get("/halls").then(({ data }) => {
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
        axiosClient.get(`/movies`).then(({ data }) => {
            setMovies(data.data);
            setLoading(false);
        });
    };

    // callback функция, для получения выбранного зала из под компонента <SelectMenusComponent>
    const selectedHall = (hall) => {
        setHall(hall);
    };

    // Функция получения всех сессий по конкретному залу
    const getSessions = () => {
        axiosClient.get(`/sessions/${hall.id}`).then(({ data }) => {
            setSessions(data);
        });
    };

    return (
        <PageComponent title="Управление сеансами">
            <>
                {loading && (
                    <div className="text-center text-lg">
                        Загрузка данных...
                    </div>
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
                                        <span className="bg-[#63536C] px-1 text-center inline-block text-white rounded text-sm border border-gray-500 font-medium">
                                            №{hall.id} - {hall.name}
                                        </span>
                                        <span> :</span>
                                    </div>

                                    <div className="flex flex-col relative h-[100px] border-2 border-[#63536C] rounded p-3">
                                        <div className="flex relative">
                                            {sessions?.map((session) => (
                                                <SessionItem
                                                    session={session}
                                                    movies={movies}

                                                    getSessions={getSessions}
                                                    pixelStart={getSessionInMinutes(
                                                        session.sessionStart
                                                    )}
                                                    key={session.id}
                                                />
                                            ))}

                                            {/* Элемент - черточки на линии */}
                                            {timeline.map((item, idx) => (
                                                <ETimeline left={item} key={idx} />
                                            ))}

                                            {/* Элемент - вертикальная линия конца дня */}
                                            <span
                                                style={{
                                                    top: -5,
                                                    left: `${(1440 * 100) / 1620
                                                        }%`,
                                                }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded"
                                            ></span>
                                        </div>
                                        {/* Нижний элемент - временная линия */}
                                        <span className="relative block w-full h-[1px] border border-gray-500 rounded -bottom-[66px]"></span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    {movies
                                        ?.slice(0)
                                        .reverse()
                                        .map((movie) => (
                                            <MovieItemSessions
                                                movie={movie}
                                                hall={hall}
                                                sessions={sessions}
                                                getSessions={getSessions}
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
    );
}
