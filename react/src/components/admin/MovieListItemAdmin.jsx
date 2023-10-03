import React from "react";
import SlidePopupComponent from "./popups/SlidePopupComponent";
import { useState } from "react";
import EButton from "../core/EButton";
import ESelection from "../core/ESelection";
import {
    AdjustmentsHorizontalIcon,
    TrashIcon,
    XCircleIcon,
    PhotoIcon,
    CloudArrowUpIcon,
} from "@heroicons/react/24/outline";

export default function MovieListItemAdmin({ movie }) {
    // Состояние для открытия/закрытия SlidePopupComponent
    const [del, setDel] = useState(false);
    const [change, setChange] = useState(false);

    // Состояния для изменения фильма
    const [name, setName] = useState();
    const [img, setImg] = useState();
    const [description, setDescription] = useState();
    const [duration, setDuration] = useState();
    const [origin, setOrigin] = useState();

    const onClickDelete = (event) => {
        event.preventDefault();
        console.log(`Отправка запроса удаления фильма №${movie.id}`);
        // TODO:
        // axiosClient.post("/signout").then((res) => {
        //     setCurrentUser({});
        //     setUserToken(null);
        // });
    };

    const onClickUpdate = (event) => {
        event.preventDefault();
        console.log(`Отправка запроса изменения данных фильма №${movie.id}`);
        // TODO:
        // axiosClient.post("/signout").then((res) => {
        //     setCurrentUser({});
        //     setUserToken(null);
        // });
    };

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

    return (
        <>
            <section className="mb-4 flex h-auto">
                <div className="p-2 bg-[#F1EBE6]/95 rounded w-[40px] flex items-center justify-center">
                    <h2 className="text-lg font-bold">{movie.id}</h2>
                </div>
                <div className="flex flex-1 justify-between h-auto ml-2 p-2 bg-[#F1EBE6]/95 rounded">
                    <div className="flex">
                        <div className="flex-1 min-w-[80px] h-[100px]">
                            <img
                                className="max-h-full"
                                alt={movie.title}
                                src={movie.img_url}
                            ></img>
                        </div>
                        <div className="flex flex-col">
                            <h2 className="text-base font-light">
                                {movie.title}
                            </h2>
                            <p className="mt-2">
                                <ESelection>{movie.duration} минут</ESelection>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <EButton circle onClick={() => setChange(true)}>
                            <AdjustmentsHorizontalIcon className="w-6 h-7" />
                        </EButton>
                        <EButton circle color="danger" onClick={() => setDel(true)}>
                            <TrashIcon className="w-6 h-7" />
                        </EButton>
                    </div>
                </div>
            </section>

            <SlidePopupComponent
                open={del}
                setOpen={setDel}
                title="Удаление фильма"
            >
                <form onSubmit="#" action="#" method="POST">
                    <div className="block text-sm font-medium leading-6 text-gray-900">
                        Вы действительно хотите удалить фильм{" "}
                        <ESelection>№{movie.id}</ESelection> ?
                    </div>
                    <div className="flex justify-between mt-5">
                        <EButton submit color="danger">
                            <TrashIcon className="h-6 w-6 mr-2" />
                            Удалить
                        </EButton>
                        <EButton color="regular" onClick={() => setDel(false)}>
                            <XCircleIcon className="h-6 w-6 mr-2" />
                            Отменить
                        </EButton>
                    </div>
                </form>
            </SlidePopupComponent>
            <SlidePopupComponent
                open={change}
                setOpen={setChange}
                title="Изменение фильма"
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

                    <div className="flex justify-between mt-6">
                        <EButton submit color="regular">
                            <CloudArrowUpIcon className="h-6 w-6 mr-2" />
                            Изменить
                        </EButton>
                        <EButton
                            color="regular"
                            onClick={() => setChange(false)}
                        >
                            <XCircleIcon className="h-6 w-6 mr-2" />
                            Отменить
                        </EButton>
                    </div>
                </form>
            </SlidePopupComponent>
        </>
    );
}
