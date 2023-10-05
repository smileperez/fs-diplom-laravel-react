import { useEffect, useState } from "react";
import PageComponent from "../../components/admin/PageComponent";
import SelectMenusComponent from "../../components/core/SelectMenusComponent";
import { useStateContext } from "../../context/ContextProvider";
import axiosClient from "../../axios";

export default function Prices() {
    const { seat_types, prices } = useStateContext();
    const [halls, setHalls] = useState();

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Загрузка списка залов при обновлении страницы
    useEffect(() => {
        setLoading(true);
        axiosClient.get("/halls").then(({ data }) => {
            setHalls(data.data);
            // setMeta(data.meta);
            setLoading(false);
        });
    }, []);

    return (
        <PageComponent title="Управление ценами">
            {loading && (
                <div className="text-center text-lg">Загрузка данных...</div>
            )}

            {!loading && (
                <>
                    <div>Выберите зал для конфигурации:</div>
                    {/* // FIXME: */}
                    {/* <SelectMenusComponent halls={halls} key={halls.id} /> */}
                    <div className="mt-6">
                        Установите цены для типов кресел:
                    </div>
                    <div>
                        {seat_types.map((seat) => (
                            <div key={seat.id} className="mt-1">{seat.type}</div>
                        ))}
                    </div>
                </>
            )}
        </PageComponent>
    );
}
