import { useStateContext } from "../../context/ContextProvider";
import MovieListItemUser from "../../components/guest/MovieListItemUser";
import NavItem from "../../components/guest/NavItem";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";
import PaginationComponent from "../../components/admin/PaginationComponent";

export default function Tickets() {
    const [weekend, setWeekend] = useState();
    const { calendar } = useStateContext();

    // Состояние для загрузки из БД общего списка фильмов
    const [movies, setMovies] = useState([]);

    // Состояние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Состояние для meta, полученной с ответом на запрос данных из БД (для pagination)
    const [meta, setMeta] = useState({});

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения фильмов и meta данных для пагинации (meta данные пагинации для компонента PaginationComponent)
    const getMovies = () => {
        setLoading(true);
        axiosClient
            .get('/getmovies')
            .then(({ data }) => {
                setMovies(data.data);
                setMeta(data.meta);
                setLoading(false);
            });
    };

    // // При каждом обновлении страницы обновляем список фильмов
    useEffect(() => {
        getMovies();
    }, []);

    // Callback для пагинации (компонент PaginationComponent)
    const onPageClick = (link) => {
        getMovies(link.url);
    };

    return (
        <>
            <nav className="h-100 flex justify-between">
                {calendar.map((day) => (
                    <NavItem day={day} key={day.day} />
                ))}

                <div className="bg-white p-3 ml-px"></div>
            </nav>

            <main>
                {loading && (
                    <div className="text-center text-lg text-white">Загрузка данных...</div>
                )}

                {!loading && (
                    <div>
                        {movies.map((movie) => (
                            <MovieListItemUser movie={movie} key={movie.id} />
                        ))}

                        <PaginationComponent
                            meta={meta}
                            onPageClick={onPageClick}
                        />
                    </div>
                )}
            </main>
        </>
    );
}
