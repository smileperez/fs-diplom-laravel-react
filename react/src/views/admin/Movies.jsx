import PageComponent from "../../components/admin/PageComponent";
import MovieListItemAdmin from "../../components/admin/MovieListItemAdmin";
import { useStateContext } from "../../context/ContextProvider";
import SlidePopupComponent from "../../components/admin/popups/SlidePopupComponent";
import { useState } from "react";

export default function Movies() {
    const { movies } = useStateContext();

    // Состояние для передачи в SlidePopupComponent
    const [open, setOpen] = useState(false);

    // Состояния для добавления нового фильма
    const [name, setName] = useState();
    const [img_url, setImg_url] = useState();
    const [description, setDescription] = useState();
    const [duration, setDuration] = useState();
    const [origin, setOrigin] = useState();

    // TODO:
    // const onSubmit = (ev) => {
    //     ev.preventDefault();
    //     setError({ __html: "" });
    //     console.log('Отправляем запрос в БД')

    // Request в сторону контрлллера Laravel
    // axiosClient
    //     .post("/signin", {
    //         email,
    //         password,
    //     })
    //     .then(({ data }) => {
    //         setCurrentUser(data.user);
    //         setUserToken(data.token);
    //     })
    //     .catch((error) => {
    //         if (error.response) {
    //             const finalErrors = Object.values(
    //                 error.response.data.errors
    //             ).reduce((accum, next) => [...accum, ...next], []);
    //             setError({ __html: finalErrors.join("<br>") });
    //         }
    //         console.error(error);
    //     });
    // };

    return (
        <PageComponent title="Управление фильмами">
            <div className="flex flex-col">
                <div className="flex justify-end">
                    <button
                        onClick={() => setOpen(true)}
                        type="button"
                        className="border border-[#63536C] bg-[#63536C] text-gray-300 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0 focus:outline-none focus:shadow-outline"
                    >
                        Добавить новый фильм
                    </button>
                </div>
                {movies.map((movie) => (
                    <MovieListItemAdmin movie={movie} key={movie.id} />
                ))}
            </div>

            <SlidePopupComponent
                open={open}
                setOpen={setOpen}
                title="Добавление нового фильма"
            >
                {/* FIXME: */}
                <form onSubmit="#" action="#" method="POST">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Название
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="name"
                                required
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label
                            htmlFor="img_url"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            URL постера
                        </label>
                        <div className="mt-2">
                            <input
                                id="img_url"
                                name="img_url"
                                type="img_url"
                                value={img_url}
                                onChange={(ev) => setImg_url(ev.target.value)}
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label
                            htmlFor="description"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Краткое описание фильма
                        </label>
                        <div className="mt-2">
                            <input
                                id="description"
                                name="description"
                                type="description"
                                value={description}
                                onChange={(ev) =>
                                    setDescription(ev.target.value)
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label
                            htmlFor="duration"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Длительность (мин)
                        </label>
                        <div className="mt-2">
                            <input
                                id="duration"
                                name="duration"
                                type="duration"
                                value={duration}
                                onChange={(ev) => setDuration(ev.target.value)}
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label
                            htmlFor="origin"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Страны происхождения (через запятую)
                        </label>
                        <div className="mt-2">
                            <input
                                id="origin"
                                name="origin"
                                type="origin"
                                value={origin}
                                onChange={(ev) => setOrigin(ev.target.value)}
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded bg-[#63536C] px-3 py-1.5 mt-6 text-gray-300 font-semibold leading-6 shadow-sm transition duration-500 hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0"
                        >
                            Добавить
                        </button>
                    </div>
                </form>
            </SlidePopupComponent>
        </PageComponent>
    );
}
