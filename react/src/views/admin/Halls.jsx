import PageComponent from "../../components/admin/PageComponent";
import HallListItem from "../../components/admin/HallListItem";
import { useStateContext } from "../../context/ContextProvider";
import SlidePopupComponent from "../../components/admin/popups/SlidePopupComponent";
import { useState } from "react";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import EButton from "../../components/core/EButton";

export default function Halls() {
    const { halls } = useStateContext();

    // Состояние для передачи в SlidePopupComponent
    const [open, setOpen] = useState(false);

    // Состояния для добавления нового зала
    const [name, setName] = useState();
    const [rows, setRows] = useState();
    const [seats, setSeats] = useState();

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
        <PageComponent
            title="Управление залами"
            button={
                <EButton color="regular" onClick={() => setOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6 mr-2" />
                    Добавить новый зал
                </EButton>
            }
        >
            {halls.map((hall) => (
                <HallListItem hall={hall} key={hall.id} />
            ))}

            <SlidePopupComponent
                open={open}
                setOpen={setOpen}
                title="Добавление нового зала"
            >
                {/* FIXME: */}
                <form onSubmit="#" action="#" method="POST">
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Название зала{" "}
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
                            htmlFor="rows"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Количество рядов
                        </label>
                        <div className="mt-2">
                            <input
                                id="rows"
                                name="rows"
                                type="rows"
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
                                type="seats"
                                value={seats}
                                onChange={(ev) => setSeats(ev.target.value)}
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
