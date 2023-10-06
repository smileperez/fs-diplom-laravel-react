import { useEffect, useState } from "react";
import PageComponent from "../../components/admin/PageComponent";
import axiosClient from "../../axios";
import ConfigItem from "../../components/admin/ConfigItem";
import MatrixComponent from "../../components/admin/MatrixComponent";
import SelectMenusComponent from "../../components/core/SelectMenusComponent";
import TypeItem from "../../components/admin/TypeItem";
import ESelection from "../../components/core/ESelection";

export default function Config() {
    // Состояние для загрузки из БД общего списка залов
    const [halls, setHalls] = useState([]);

    const [hall, setHall] = useState();

    // Состояние для загрузки из БД общего списка типов мест
    const [types, setTypes] = useState([]);

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getHalls = () => {
        setLoading(true);
        axiosClient.get("/halls").then(({ data }) => {
            setHalls(data.data);
            setLoading(false);
        });
    };
    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getTypes = () => {
        setLoading(true);
        axiosClient.get("/types").then(({ data }) => {
            setTypes(data.data);
            setLoading(false);
        });
    };

    // При каждом обновлении страницы обновляем URL страниц пагинации (для компонента PaginationComponent)
    useEffect(() => {
        getHalls();
        getTypes();
    }, []);

    const selectedHall = (hall) => {
        setHall(hall);
        // console.log(hall);
    };

    return (
        <PageComponent title="Настройка залов">
            {loading && (
                <div className="text-center text-lg">Загрузка данных...</div>
            )}

            {!loading && (
                <>
                    <div>
                        <h2>Выберите зал для конфигурации:</h2>
                        <SelectMenusComponent
                            selectedHall={selectedHall}
                            items={halls}
                            key={halls.id}
                        />
                    </div>

                    <div className="flex flex-col mt-3">
                        <h2>Доступные типы мест:</h2>
                        <div className="flex space-x-1 mt-2">
                            {types.map((type) => (
                                <div>
                                    <ESelection color={type.color}>
                                        <span>
                                            ID:{type.id} - {type.type}
                                        </span>
                                    </ESelection>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="mt-3">
                        <h2>Конфигурация:</h2>
                        {hall && <MatrixComponent rows={hall.rows} seats={hall.seats} />}
                    </div>
                </>
            )}
        </PageComponent>
    );
}
