import PageComponent from "../../components/admin/PageComponent";
import MovieListItemAdmin from "../../components/admin/MovieListItemAdmin";
import { useStateContext } from "../../context/ContextProvider";
import SlidePopupComponent from "../../components/admin/popups/SlidePopupComponent";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import EButton from "../../components/core/EButton";

export default function Movies() {
    const { movies } = useStateContext();

    // Состояния для открытия/закрытия в SlidePopupComponent
    const [open, setOpen] = useState(false);

    // Состояния для добавления нового фильма
    const [name, setName] = useState();
    const [img, setImg] = useState();
    const [description, setDescription] = useState();
    const [duration, setDuration] = useState();
    const [origin, setOrigin] = useState();

    const onImageChoose = (ev) => {
        const file = ev.target.files[0];

        // FIXME:
        const reader = new FileReader();
        reader.onload = () => {
            setSurvey({
                ...survey,
                image: file,
                image_url: reader.result,
            });

            ev.target.value = "";
        };
        reader.readAsDataURL(file);
    };

    // TODO:
    const onSubmit = (ev) => {
        ev.preventDefault();
        setError({ __html: "" });
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
    };

    return (
        // TODO: 1:46:51
        <PageComponent
            title="Управление фильмами"
            button={
                <EButton color="regular" onClick={() => setOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6 mr-2" />
                    Добавить фильм
                </EButton>
            }
        >
            <div>
                {movies.map((movie) => (
                    <MovieListItemAdmin movie={movie} key={movie.id} />
                ))}
            </div>

            {/* Slide-Popup для добавления нового фильма */}
            <SlidePopupComponent
                open={open}
                setOpen={setOpen}
                title="Добавление нового фильма"
            >
                {/* FIXME: */}
                {/* Название фильма */}
                <form onSubmit={onSubmit} action="#" method="POST">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Название фильма{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                required
                                id="name"
                                name="name"
                                value={movies.name}
                                onChange={(ev) => setName(ev.target.value)}
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
                            {movies.img_url && (
                                <img
                                    src={movies.img_url}
                                    alt=""
                                    className="w-32 h-32 object-cover"
                                />
                            )}
                            {!movies.img_url && (
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
                                value={movies.description}
                                defaultValue={""}
                                onChange={(ev) =>
                                    setDescription(ev.target.value)
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
                                value={movies.duration}
                                onChange={(ev) => setDuration(ev.target.value)}
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
                                value={movies.origin}
                                onChange={(ev) => setOrigin(ev.target.value)}
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Страны происхождения */}

                    <div className="flex justify-between mt-6">
                        <EButton submit>
                            <PlusCircleIcon className="h-6 w-6 mr-2" />
                            Добавить
                        </EButton>

                        <EButton onClick={() => setOpen(false)}>
                            <XCircleIcon className="h-6 w-6 mr-2" />
                            Отменить
                        </EButton>
                    </div>
                </form>
            </SlidePopupComponent>
        </PageComponent>
    );
}
