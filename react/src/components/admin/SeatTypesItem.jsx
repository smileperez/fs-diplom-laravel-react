import SlidePopupComponent from "../core/SlidePopupComponent";
import EButton from "../core/EButton";
import ESelection from "../core/ESelection";
import ESeat from "../core/ESeat";
import { useState } from "react";
import {
    AdjustmentsHorizontalIcon,
    CloudArrowUpIcon,
    TrashIcon,
    XCircleIcon,
    XMarkIcon,
} from "@heroicons/react/24/outline";
import axiosClient from "../../axios";

export default function SeatTypesItem({ seatType }) {
    // Открытие/Закрытие SlidePopupComponent для изменения зала
    const [change, setChange] = useState(false);
    // Открытие/Закрытие SlidePopupComponent для удаления зала
    const [del, setDel] = useState(false);

    // FIXME:
    // Состояния для изменения зала
    const [updatedSeatType, setUpdatedSeatType] = useState({
        type: seatType.type,
    });

    // FIXME:
    // Состояние для хранения ошибки
    // const [error, setError] = useState("");

    // FIXME:
    // Отправка put-request в БД c изменениями зала
    // const onSubmit = (event) => {
    //     event.preventDefault();

    //     const payload = { ...updatedSeatType };
    //     axiosClient
    //         .put(`/seattypes/${seatType.id}`, payload)
    //         .then((response) => {
    //             console.log(response);
    //             // Закрываем slider-popup
    //             setChange(false);
    //             // Заново перезагружаем из БД все залы
    //             getSeatTypes();
    //         })
    //         .catch((err) => {
    //             if (err && err.response) {
    //                 // Записываем error в состояние
    //                 setError(err.response.data.message);
    //             }
    //             console.log(err, err.response);
    //         });
    // };

    // FIXME:
    // Функция удаления зала
    // const onClickDelete = (event) => {
    //     axiosClient.delete(`/seattypes/${seatType.id}`).then((response) => {
    //         // Закрываем slider-popup
    //         setChange(false);
    //         // Заново перезагружаем из БД все фильмы
    //         getSeatTypes();
    //     });
    // };

    return (
        <>
            <section className="mb-4 flex h-auto">
                <div className="flex flex-1 justify-between h-18 ml-2 p-2 bg-[#F1EBE6]/95 rounded">
                    <div className="flex">
                        <div className="w-auto">
                            <h2 className="text-sm font-light">
                                ID: <ESelection>{seatType.id}</ESelection>
                            </h2>
                            <h2 className="text-sm font-light">
                                Название:{" "}
                                <ESelection>{seatType.type}</ESelection>
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
                title={`Изменение типа №` + seatType.id}
            >
                {/* // FIXME: */}
                {/* {error && (
                    <div className="bg-red-500 text-white text-sm py-2 px-2 mb-1 rounded">
                        {error}
                    </div>
                )} */}
                <form onSubmit="#" action="#" method="POST">
                    {/* Название тима песта */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Название типа места
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="type"
                                name="type"
                                value={updatedSeatType.type}
                                onChange={(event) =>
                                    setUpdatedSeatType({
                                        ...updatedSeatType,
                                        type: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Название зала */}

                    <div className="mt-2">
                        <label
                            htmlFor="config"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        ></label>
                    </div>

                    <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                        <EButton submit color="regular">
                            <CloudArrowUpIcon className="h-6 w-6 mr-2" />
                            Изменить
                        </EButton>
                        <EButton color="gray" onClick={() => setChange(false)}>
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
                    Вы действительно хотите удалить этот тип места?
                </div>

                <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                    <EButton submit color="danger" onClick="#">
                        <TrashIcon className="h-6 w-6 mr-2" />
                        Удалить
                    </EButton>
                    <EButton color="gray" onClick={() => setDel(false)}>
                        <XCircleIcon className="h-6 w-6 mr-2" />
                        Отменить
                    </EButton>
                </div>
            </SlidePopupComponent>
            {/* Slide-Popup для УДАЛЕНИЯ  фильма */}
        </>
    );
}
