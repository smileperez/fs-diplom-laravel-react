import PageComponent from "../../components/admin/PageComponent";
import HallListItem from "../../components/admin/HallListItem";
import { useStateContext } from "../../context/ContextProvider";
import SlidePopupComponent from "../../components/admin/popups/SlidePopupComponent";
import { useState } from "react";

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
        <PageComponent title="Управление залами">
            <div className="flex flex-col">
                <div className="flex justify-end">
                    <button
                        onClick={() => setOpen(true)}
                        type="button"
                        className="border border-[#63536C] bg-[#63536C] text-gray-300 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0 focus:outline-none focus:shadow-outline"
                    >
                        Добавить новый зал
                    </button>
                </div>
                {halls.map((hall) => (
                    <HallListItem hall={hall} key={hall.id} />
                ))}
            </div>

            <SlidePopupComponent
                open={open}
                setOpen={setOpen}
                title="Добавление нового зала"
            >
                лол
            </SlidePopupComponent>
        </PageComponent>
    );
}
