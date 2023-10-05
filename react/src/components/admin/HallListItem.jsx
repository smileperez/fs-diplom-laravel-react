import SlidePopupComponent from "../core/SlidePopupComponent";
import EButton from "../core/EButton";
import ESelection from "../core/ESelection";
import { useState } from "react";
import {
    AdjustmentsHorizontalIcon,
    CloudArrowUpIcon,
    TrashIcon,
    XCircleIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../../axios";

export default function HallListItem({ hall, getHalls }) {
    // Открытие/Закрытие SlidePopupComponent для изменения зала
    const [change, setChange] = useState(false);
    // Открытие/Закрытие SlidePopupComponent для удаления зала
    const [del, setDel] = useState(false);

    // Состояния для изменения зала
    const [updatedHall, setUpdatedHall] = useState({
        name: hall.name,
        rows: hall.rows,
        seats: hall.seats,
    });

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Отправка put-request в БД c изменениями зала
    const onSubmit = (event) => {
        event.preventDefault();
        console.log("Клик");
        const payload = { ...updatedHall };
        axiosClient
            .put(`/halls/${hall.id}`, payload)
            .then((response) => {
                console.log(response);
                // Закрываем slider-popup
                setChange(false);
                // Заново перезагружаем из БД все залы
                getHalls();
            })
            .catch((err) => {
                if (err && err.response) {
                    // Записываем error в состояние
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
    };

    // TODO:
    // Функция удаления зала
    const onClickDelete = (event) => {
        event.preventDefault();
        console.log(`Отправка запроса удаления зала №${hall.id}`);
        // TODO:
        // axiosClient.post("/signout").then((res) => {
        //     setCurrentUser({});
        //     setUserToken(null);
        // });
    };

    return (
        <>
            <section className="mb-4 flex h-auto">
                <div className="p-2 bg-[#F1EBE6]/95 rounded min-w-[40px] max-w-[40px] flex items-center justify-center">
                    <h2 className="text-xl font-bold">{hall.id}</h2>
                </div>
                <div className="flex flex-1 justify-between h-18 ml-2 p-2 bg-[#F1EBE6]/95 rounded">
                    <div className="flex">
                        <div className="w-auto">
                            <h2 className="text-sm font-light">
                                Название зала:{" "}
                                <ESelection>{hall.name}</ESelection>
                            </h2>
                            <h2 className="text-sm font-light mt-1">
                                Конфигурация зала:{" "}
                                <ESelection>
                                    {hall.rows} x {hall.seats}
                                </ESelection>
                            </h2>
                        </div>
                        <div className="ml-6">
                            <h2 className="text-sm font-light">
                                Общее кол-во мест:{" "}
                                <ESelection>
                                    {hall.rows * hall.seats}
                                </ESelection>
                            </h2>
                            <h2 className="text-sm font-light mt-1">
                                Количество VIP мест:{" "}
                                <ESelection color="gold">
                                    {hall.seats}
                                </ESelection>
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <EButton circle onClick={() => setChange(true)}>
                            <AdjustmentsHorizontalIcon className="w-6 h-7" />
                        </EButton>
                        <EButton
                            circle
                            color="danger"
                            onClick={() => setDel(true)}
                        >
                            <TrashIcon className="w-6 h-7" />
                        </EButton>
                    </div>
                </div>
            </section>

            {/* Slide-Popup для ИЗМЕНЕНИЯ  фильма */}
            <SlidePopupComponent
                open={change}
                setOpen={setChange}
                title={`Изменение зала №` + hall.id}
            >
                {error && (
                    <div className="bg-red-500 text-white text-sm py-2 px-2 mb-1 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} action="#" method="POST">
                    {/* Название зала */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Название зала
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={updatedHall.name}
                                onChange={(event) =>
                                    setUpdatedHall({
                                        ...updatedHall,
                                        name: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Название зала */}

                    {/* Количество рядов */}
                    <div className="mt-2">
                        <label
                            htmlFor="rows"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Количество рядов
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="rows"
                                name="rows"
                                value={updatedHall.rows}
                                onChange={(event) =>
                                    setUpdatedHall({
                                        ...updatedHall,
                                        rows: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Количество рядов */}

                    {/* Количество мест в ряду */}
                    <div className="mt-2">
                        <label
                            htmlFor="seats"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Количество мест в ряду
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="seats"
                                name="seats"
                                value={updatedHall.seats}
                                onChange={(event) =>
                                    setUpdatedHall({
                                        ...updatedHall,
                                        seats: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Количество мест в ряду */}

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
            {/* Slide-Popup для ИЗМЕНЕНИЯ  фильма */}

            {/* Slide-Popup для УДАЛЕНИЯ  фильма */}
            <SlidePopupComponent
                open={del}
                setOpen={setDel}
                title="Удаление фильма"
            >
                <div className="block text-sm font-medium leading-6 text-gray-900">
                    Вы действительно хотите удалить этот зал?
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
            </SlidePopupComponent>
            {/* Slide-Popup для УДАЛЕНИЯ  фильма */}
        </>
    );
}
