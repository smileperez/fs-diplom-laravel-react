import PageComponent from "../../components/admin/PageComponent";
import SelectMenusComponent from "../../components/core/SelectMenusComponent";
import { useStateContext } from "../../context/ContextProvider";

export default function Prices() {
    const { halls, seat_types, prices } = useStateContext();

    return (
        <PageComponent title="Управление ценами">
            <div>Выберите зал для конфигурации:</div>
            <SelectMenusComponent halls={halls} />
            <div className="mt-6">Установите цены для типов кресел:</div>
            {seat_types.map((seat) => (
                <div className="mt-1">{seat.type}</div>
            ))}
        </PageComponent>
    );
}
