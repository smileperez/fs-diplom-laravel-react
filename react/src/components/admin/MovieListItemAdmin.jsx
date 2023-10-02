import React from "react";
import {
    AdjustmentsHorizontalIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";
import SlidePopupComponent from "./popups/SlidePopupComponent";
import { useState } from "react";

export default function MovieListItemAdmin({ movie }) {
    // Состояние для передачи в SlidePopupComponent
    const [open, setOpen] = useState(false);

    const onClickDelete = (event) => {
        event.preventDefault();
        console.log("Происходит удаление фильма");
        // TODO:
        // axiosClient.post("/signout").then((res) => {
        //     setCurrentUser({});
        //     setUserToken(null);
        // });
    };

    return (
        <>
            <section className="mt-4 flex">
                <div className="p-2 bg-[#F1EBE6]/95 rounded w-[40px] flex items-center justify-center">
                    <h2 className="text-lg font-bold">{movie.id}</h2>
                </div>
                <div className="flex flex-1 justify-between h-[100px] ml-2 p-2 bg-[#F1EBE6]/95 rounded">
                    <div className="flex">
                        <div className="flex-1 w-[70px] h-full">
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
                            <p className="text-xs font-normal mt-2">
                                <span className="inline-block w-auto px-2 py-1 bg-[#63536C] rounded text-white">
                                    {movie.duration} минут
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <AdjustmentsHorizontalIcon
                            // FIXME:
                            // onClick={onConfigureClick}
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
                    <div className="block text-sm font-medium leading-6 text-gray-900">
                        Вы действительно хотите удалить этот фильм?
                    </div>

                    <div className="flex">
                        <button
                            onClick={onClickDelete}
                            type="button"
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
