import React from "react";
import {
    AdjustmentsHorizontalIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import SlidePopupComponent from "./popups/SlidePopupComponent";
import { useState } from "react";

export default function HallListItem({ hall }) {
    // Состояние для передачи в SlidePopupComponent
    const [open, setOpen] = useState(false);

    const onConfigureClick = (event) => {
        event.preventDefault();
        console.log("Configure this hall");

        // axiosClient.post("/signout").then((res) => {
        //     setCurrentUser({});
        //     setUserToken(null);
        // });
    };

    return (
        <>
            <section className="mt-4 flex">
                <div className="p-2 bg-[#F1EBE6]/95 rounded w-[40px] flex items-center justify-center">
                    <h2 className="text-xl font-bold">{hall.id}</h2>
                </div>
                <div className="flex flex-1 justify-between h-18 ml-2 p-2 bg-[#F1EBE6]/95 rounded">
                    <div className="flex flex">
                        <div className="w-auto">
                            <h2 className="text-sm font-light">
                                Название зала:{" "}
                                <span className="inline-block w-auto px-2 py-1 bg-[#63536C] rounded text-white text-xs font-normal">
                                    {hall.name}
                                </span>
                            </h2>
                            <h2 className="text-sm font-light mt-1">
                                Конфигурация зала:{" "}
                                <span className="inline-block w-auto px-2 py-1 bg-[#63536C] rounded text-white text-xs font-normal">
                                    {hall.rows} x {hall.seats}
                                </span>
                            </h2>
                        </div>
                        <div className="ml-6">
                            <h2 className="text-sm font-light font-thin">
                                Общее кол-во мест:{" "}
                                <span className="inline-block w-auto px-2 py-1 bg-[#63536C] rounded text-white text-xs font-normal">
                                    {hall.rows * hall.seats}
                                </span>
                            </h2>
                            <h2 className="text-sm font-light mt-1">
                                Количество VIP мест:{" "}
                                <span className="inline-block w-auto px-2 py-1 bg-[#b89e14] rounded text-black text-xs font-semibold">
                                    {hall.seats}
                                </span>
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <AdjustmentsHorizontalIcon
                            onClick={onConfigureClick}
                            className="block w-6 h-7 mr-4 text-[#63536C] cursor-pointer"
                        />
                        <TrashIcon
                            onClick={() => setOpen(true)}
                            className="block w-6 h-7 mr-4 text-red-500 cursor-pointer"
                        />
                    </div>
                </div>
            </section>

            <SlidePopupComponent
                open={open}
                setOpen={setOpen}
                title="Удаление фильма"
            >
                <form onSubmit="#" action="#" method="POST">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Вы действительно хотите удалить зал ?
                        </label>
                    </div>

                    <div className="flex">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded bg-red-500 px-3 py-1.5 mt-6 text-black font-semibold leading-6 shadow-sm transition duration-500 hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0"
                        >
                            Удалить
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
        </>
    );
}
