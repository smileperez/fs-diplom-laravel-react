import PageComponent from "../../components/admin/PageComponent";
import SlidePopupComponent from "../../components/core/SlidePopupComponent";
import MovieListItemAdmin from "../../components/admin/MovieListItemAdmin";
import EButton from "../../components/core/EButton";
import { useEffect, useState } from "react";
import {
    PlusCircleIcon,
    XCircleIcon,
    PhotoIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../../axios.js";
import PaginationComponent from "../../components/admin/PaginationComponent";

export default function Movies() {
    // Состояние для загрузки из БД общего списка фильмов
    const [movies, setMovies] = useState([]);

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Соятоние для meta, полученной с ответом на запрос данных из БД (для pagination)
    const [meta, setMeta] = useState({});

    // Состояния для открытия/закрытия в SlidePopupComponent
    const [open, setOpen] = useState(false);

    // Состояния для добавления нового фильма
    const [movie, setMovie] = useState({
        title: "",
        img: null,
        img_url: null,
        description: "",
        duration: 0,
        origin: "",
    });

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getMovies = (url) => {
        url = url || "/movies";
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setMovies(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };
    // При каждом обновлении страницы обновляем URL страниц пагинации (для компонента PaginationComponent)
    useEffect(() => {
        getMovies();
    }, []);
    // Callback для пагинации (компонент PaginationComponent)
    const onPageClick = (link) => {
        getMovies(link.url);
    };

    // Функция подгрузки изображения из input
    const onImageChoose = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setMovie({
                ...movie,
                img: file,
                img_url: reader.result,
            });
            event.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    // Отправка request в БД с новым фильмом
    const onSubmit = (event) => {
        event.preventDefault();

        const payload = { ...movie };
        if (payload.img) {
            payload.img = payload.img_url;
        }

        delete payload.img_url;

        axiosClient
            .post("/movies", payload)
            .then((response) => {
                console.log(response);
                // Закрываем slider-popup
                setOpen(false);
                // Перезагружаем страницу
                getMovies();
            })
            .catch((err) => {
                if (err && err.response) {
                    // Записываем error в состояние
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
    };

    return (
        <PageComponent
            title="Управление фильмами"
            button={
                <EButton color="regular" onClick={() => setOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6" />
                    <div className="hidden md:ml-2 md:block">
                        Добавить фильм
                    </div>
                </EButton>
            }
        >
            {loading && (
                <div className="text-center text-lg">Загрузка данных...</div>
            )}

            {!loading && (
                <div>
                    {movies.map((movie) => (
                        <MovieListItemAdmin
                            movie={movie}
                            getMovies={getMovies}
                            key={movie.id}
                        />
                    ))}

                    <PaginationComponent
                        meta={meta}
                        onPageClick={onPageClick}
                    />
                </div>
            )}

            {/* Slide-Popup для ДОБАВЛЕНИЯ нового фильма */}
            <SlidePopupComponent
                open={open}
                setOpen={setOpen}
                title="Добавление нового фильма"
            >
                {error && (
                    <div className="bg-red-500 text-white text-sm py-2 px-2 mb-1 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} action="#" method="POST">
                    {/* Название фильма */}
                    <div>
                        <label
                            htmlFor="title"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Название фильма{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={movie.title}
                                onChange={(event) =>
                                    setMovie({
                                        ...movie,
                                        title: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Название фильма */}

                    {/* Загрузка картинки */}
                    <div className="mt-2">
                        <label className="block text-sm font-medium text-gray-900">
                            Загрузить постер
                        </label>

                        <div className="mt-1 flex items-center">
                            {movie.img_url && (
                                <img
                                    src={movie.img_url}
                                    alt=""
                                    className="w-32 h-32 object-cover"
                                />
                            )}
                            {!movie.img_url && (
                                <span className="flex justify-center items-center text-[#63536C] h-12 w-12 overflow-hidden rounded-full bg-gray-200">
                                    <PhotoIcon className="w-8 h-8" />
                                </span>
                            )}
                            <button
                                type="button"
                                className="relative flex items-center text-sm transition duration-500 outline-none font-semibold whitespace-nowrap p-2 px-4 ml-5 rounded-md bg-[#63536C] text-gray-300 hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0"
                            >
                                <input
                                    type="file"
                                    onChange={onImageChoose}
                                    className="block absolute left-0 top-0 right-0 bottom-0 opacity-0 cursor-pointer "
                                />
                                Выбрать
                            </button>
                        </div>
                    </div>
                    {/* Загрузка картинки */}

                    {/* Описание */}
                    <div className="mt-2">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Краткое описание фильма
                        </label>
                        <div className="mt-2">
                            <textarea
                                rows={3}
                                id="description"
                                name="description"
                                value={movie.description}
                                onChange={(event) =>
                                    setMovie({
                                        ...movie,
                                        description: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Описание */}

                    {/* Длительность */}
                    <div className="mt-2">
                        <label
                            htmlFor="duration"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Длительность (мин)
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="duration"
                                name="duration"
                                value={movie.duration}
                                onChange={(event) =>
                                    setMovie({
                                        ...movie,
                                        duration: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Длительность */}

                    {/* Страны происхождения */}
                    <div className="mt-2">
                        <label
                            htmlFor="origin"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Страны происхождения (через запятую)
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="origin"
                                name="origin"
                                value={movie.origin}
                                onChange={(event) =>
                                    setMovie({
                                        ...movie,
                                        origin: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Страны происхождения */}

                    <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                        <EButton submit>
                            <PlusCircleIcon className="h-6 w-6 mr-2" />
                            Добавить
                        </EButton>

                        <EButton color="gray" onClick={() => setOpen(false)}>
                            <XCircleIcon className="h-6 w-6 mr-2" />
                            Отменить
                        </EButton>
                    </div>
                </form>
            </SlidePopupComponent>
            {/* Slide-Popup для ДОБАВЛЕНИЯ нового фильма */}
        </PageComponent>
    );
}
