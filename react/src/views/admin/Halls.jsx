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

    const onCreateClick = (event) => {
        event.preventDefault();
        console.log("Create new hall");

        // axiosClient.post("/signout").then((res) => {
        //     setCurrentUser({});
        //     setUserToken(null);
        // });
    };

    return (
        <PageComponent title="Управление залами">
            <div className="flex flex-col">
                <div className="flex justify-end">
                    <button
                        onClick={onCreateClick}
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

            </SlidePopupComponent>
        </PageComponent>
    );
}
