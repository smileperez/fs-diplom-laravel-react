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

export default function HallListItem({ hall }) {
    // Состояние для открытия/закрытия SlidePopupComponent
    const [del, setDel] = useState(false);
    const [change, setChange] = useState(false);

    // Состояния для изменения зала
    const [name, setName] = useState();
    const [rows, setRows] = useState();
    const [seats, setSeats] = useState();

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

    const onClickUpdate = (event) => {
        event.preventDefault();
        console.log(`Отправка запроса изменения данных зала №${hall.id}`);
        // TODO:
        // axiosClient.post("/signout").then((res) => {
        //     setCurrentUser({});
        //     setUserToken(null);
        // });
    };

    return (
        <>
            <section className="mb-4 flex">
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

            <SlidePopupComponent
                open={del}
                setOpen={setDel}
                title="Удаление фильма"
            >
                <form onSubmit="#" action="#" method="POST">
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
                </form>
            </SlidePopupComponent>

            <SlidePopupComponent
                open={change}
                setOpen={setChange}
                title="Изменение зала"
            >
                {/* FIXME: */}
                <form onSubmit="#" action="#" method="POST">
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
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                onChange={(ev) => setName(ev.target.value)}
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label
                            htmlFor="rows"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Количество рядов
                        </label>
                        <div className="mt-2">
                            <input
                                id="rows"
                                name="rows"
                                type="number"
                                value={rows}
                                onChange={(ev) => setRows(ev.target.value)}
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <label
                            htmlFor="seats"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Количество мест в ряду
                        </label>
                        <div className="mt-2">
                            <input
                                id="seats"
                                name="seats"
                                type="number"
                                value={seats}
                                onChange={(ev) => setSeats(ev.target.value)}
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
