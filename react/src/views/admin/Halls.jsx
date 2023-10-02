import PageComponent from "../../components/admin/PageComponent";
import HallListItem from "../../components/admin/HallListItem";
import { useStateContext } from "../../context/ContextProvider";

export default function Halls() {
    const { halls } = useStateContext();

    return (
        <PageComponent title="Управление залами">
            <div className="flex flex-col">
                <div className="flex justify-end">
                    <button
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
        </PageComponent>
    );
}
