import PageComponent from "../../components/admin/PageComponent";
import MovieListItemAdmin from "../../components/admin/MovieListItemAdmin";
import { useStateContext } from "../../context/ContextProvider";
import SlidePopupComponent from "../../components/admin/popups/SlidePopupComponent";
import { useState } from "react";
import { PhotoIcon } from "@heroicons/react/24/solid";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import EfimButton from "../../components/core/EfimButton";

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
        // TODO: 1:46:51
        <PageComponent
            title="Управление фильмами"
            button={
                <EfimButton color="regular" onClick={() => setOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6 mr-2" />
                    Добавить новый фильм
                </EfimButton>
            }
        >
            <div>
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
                            Название фильма{" "}
                            <span className="text-red-500">*</span>
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
                            htmlFor="img"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Загрузить постер
                        </label>
                        <PhotoIcon
                            className="mx-auto h-12 w-12 text-gray-300"
                            aria-hidden="true"
                        />
                        <div className="mt-2">
                            <button
                                type="button"
                                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                            >
                                <input
                                    type="file"
                                    onChange={onImageChoose}
                                    className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                                Добавить
                            </button>
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
                            <textarea
                                id="description"
                                name="description"
                                type="description"
                                value={description}
                                rows={3}
                                defaultValue={""}
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

                    <div className="flex">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded bg-[#63536C] px-3 py-1.5 mt-6 text-gray-300 font-semibold leading-6 shadow-sm transition duration-500 hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0"
                        >
                            Добавить
                        </button>
                        <button
                            onClick={() => setOpen(false)}
                            type="button"
                            className="flex w-full justify-center rounded bg-[#63536C] px-3 py-1.5 mt-6 ml-10 text-gray-300 font-semibold leading-6 shadow-sm transition duration-500 hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0"
                        >
                            Отменить
                        </button>
                    </div>
                </form>
            </SlidePopupComponent>
        </PageComponent>
    );
}
