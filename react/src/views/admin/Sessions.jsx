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
    // const sessionsByTime = sessions?.forEach(element => {
    //     // element.map(session => console.log(session))
    //     console.log(Object.entries(element))
    // });

    // const sessionsByTime = sessions?.sort((a, b) => Number(a.sessionStart.replace(":", ''))-Number(b.sessionStart.replace(":", '')))

    // const sessionsByTime = () => {
    //     sessions?.forEach(element => {element.sessionStart = element.sessionStart.slice(0, -3).replace(":", '')})

    // }

    // Вспомогательная функция, переводящая тектовый формат времени в минуты
    const getSessionInMinutes = (session) => {
        console.log(`${session}`);
        const hours = Number(session.substr(0, session.indexOf(':')));
        const minutes = Number(session.slice(3).substr(0, session.indexOf(':')));
        console.log(`${hours} x 60 + ${minutes}`);
        // console.log(hours * 60 + minutes);
        return hours * 60 + minutes;
    }

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

                                    <div className="flex flex-col relative h-[100px] border-2 border-[#63536C] rounded p-3">
                                        <div className="flex relative">
                                            {sessions?.map((session) => (
                                                <SessionItem
                                                    session={session}
                                                    movies={movies}
                                                    getSessions={getSessions}
                                                    key={session.id}
                                                    pixelStart={getSessionInMinutes(session.sessionStart)}
                                                />
                                            ))}

                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: `60px`,
                                                left: `${60 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[8px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: `60px`,
                                                left: `${120 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: `60px`,
                                                left: `${180 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: `60px`,
                                                left: `${240 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: `60px`,
                                                left: `${300 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: `60px`,
                                                left: `${360 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: `60px`,
                                                left: `${420 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: `60px`,
                                                left: `${480 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${540 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${600 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${660 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${720 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${780 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${840 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${900 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${960 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${1020 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${1080 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${1140 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${1200 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${1260 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${1320 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${1380 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>
                                            {/* Правый элемент - линия конец дня */}
                                            <span style={{
                                                top: -5,
                                                left: `${1440 * 100 / 1620}%`
                                            }}
                                                className="absolute h-[80px] w-[1px] border border-gray-500 rounded">
                                            </span>


                                        </div>
                                        {/* Нижний элемент - временная линия */}
                                        <span className="relative block w-full h-[1px] border border-gray-500 rounded -bottom-[66px]"></span>
                                    </div>
                                </div>
                                <div className="flex flex-wrap">
                                    {movies?.slice(0).reverse().map((movie) => (
                                        <MovieItemSessions
                                            movie={movie}
                                            hall={hall}
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
    )
}
