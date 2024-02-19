import PageComponent from "../../components/admin/PageComponent";
import SelectMenusComponent from "../../components/core/SelectMenusComponent";
import MovieItemSessions from "../../components/admin/MovieItemSessions.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";

export default function Sessions() {
    // Состояние для загрузки из БД общего списка фильмов
    const [movies, setMovies] = useState([]);

    // Состояние для загрузки залов из БД
    const [halls, setHalls] = useState([]);

    // Состояние для выбора конкретного зала
    const [hall, setHall] = useState();

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Функция получения списка залов из БД
    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/halls")
            .then(({ data }) => {
                setHalls(data.data);
                getMovies()
            });
    }, []);


    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getMovies = (url) => {
        url = url || "/movies";
        axiosClient.get(url).then(({ data }) => {
            setMovies(data.data);
            setLoading(false);
        });
    };

    // callback функция, для получения выбранного зала из под компонента <SelectMenusComponent>
    const selectedHall = (hall) => {
        setHall(hall);
    };


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
                                <div className="flex justify-center items-center my-5">
                                    Сетка сеансов для зала <div className={`bg-[#63536C] w-auto px-1 ml-1 text-center inline-block text-white rounded text-s border border-gray-500 font-medium`}>№{hall.id} - {hall.name}</div>


                                </div>
                                <div className="flex flex-wrap">
                                    {movies.slice(0).reverse().map((movie) => (
                                        <MovieItemSessions
                                            movie={movie}
                                            hall={hall}
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
