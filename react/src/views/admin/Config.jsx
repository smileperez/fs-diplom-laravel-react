import { useEffect, useState } from "react";
import PageComponent from "../../components/admin/PageComponent";
import axiosClient from "../../axios";
import ConfigItem from "../../components/admin/ConfigItem";
import MatrixComponent from "../../components/admin/MatrixComponent";

export default function Config() {
    // Состояние для загрузки из БД общего списка залов
    const [halls, setHalls] = useState([]);

    // Состояние для загрузки из БД общего списка типов мест
    const [types, setTypes] = useState([]);

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getHallsTypes = () => {
        // setLoading(true);
        axiosClient.get("/halls").then(({ data }) => {
            setHalls(data.data);
            // setMeta(data.meta);
        });
        axiosClient.get("/types").then(({ data }) => {
            setTypes(data.data);
            // setMeta(data.meta);
        });
        // setLoading(false);
    };
    // При каждом обновлении страницы обновляем URL страниц пагинации (для компонента PaginationComponent)
    useEffect(() => {
        getHallsTypes();
    }, []);

    return (
        <PageComponent title="Настройка залов">
            {/* {loading && (
                <div className="text-center text-lg">Загрузка данных...</div>
            )} */}
            <MatrixComponent rows={8} seats={6} />
            {/* {!loading && (
                <div>
                    {halls.map((hall) => (
                        <ConfigItem hall={hall} key={hall.id} />
                    ))}
                </div>
            )} */}
        </PageComponent>
    );
}
