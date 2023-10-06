import { useEffect, useState } from "react";
import PageComponent from "../../components/admin/PageComponent";
import axiosClient from "../../axios";
import MatrixComponent from "../../components/admin/MatrixComponent";
import SelectMenusComponent from "../../components/core/SelectMenusComponent";
import ESelection from "../../components/core/ESelection";

export default function Config() {
    // Состояние для загрузки залов из БД
    const [halls, setHalls] = useState([]);

    // Состояние для выбора конкретного зала
    const [hall, setHall] = useState();

    // Состояние для загрузки всех типов мест из БД
    const [types, setTypes] = useState([]);

    // Соятоние загрузки данных
    const [loading, setLoading] = useState(false);

    // Функция получения списка залов из БД
    useEffect(() => {
        setLoading(true);
        axiosClient.get("/halls").then(({ data }) => {
            setHalls(data.data);
            setLoading(false);
        });
    }, []);

    // Функция получения списка залов из БД
    useEffect(() => {
        setLoading(true);
        axiosClient.get("/types").then(({ data }) => {
            setTypes(data.data);
            setLoading(false);
        });
    }, []);

    // callback функция, для получения выбранного зала из под компонента Селектора
    const selectedHall = (hall) => {
        setHall(hall);
    };

    return (
        <PageComponent title="Настройка залов">
            {loading && (
                <div className="text-center text-lg">Загрузка данных...</div>
            )}

            {!loading && (
                <>
                    <div>
                        <h2 className="font-semibold">
                            Выберите зал для конфигурации:
                        </h2>
                        <SelectMenusComponent
                            selectedHall={selectedHall}
                            items={halls}
                            key={halls.id}
                        />
                    </div>

                    <div className="flex flex-col mt-3">
                        <h2 className="font-semibold">Доступные типы мест:</h2>
                        <div className="flex flex-wrap mt-1">
                            {types.map((type, idx) => (
                                <div className="mt-1 mr-2 last:mr-0" key={idx}>
                                    <ESelection color={type.color}>
                                        <span>
                                            ID:{type.id} - {type.type}
                                        </span>
                                    </ESelection>
                                </div>
                            ))}
                        </div>
                        <h2 className="text-sm font-normal text-gray-400">
                            Чтобы изменить вид кресла, нажмите по нему левой
                            кнопкой мыши
                        </h2>
                    </div>

                    <div className="mt-3">
                        <h2 className="font-semibold">Конфигурация мест:</h2>
                        <div className="border-2 border-[#63536C] rounded p-3 mt-2">
                            {!hall && (
                                <span className="text-sm font-normal text-gray-400">
                                    Для отображения конфигурации выберите зал
                                </span>
                            )}
                            {hall && (
                                <div className="flex flex-col justify-center items-center">
                                    <span className="tracking-[1.25em] ml-5">
                                        ЭКРАН
                                    </span>
                                    <div className="mt-2">
                                        <MatrixComponent
                                            rows={hall.rows}
                                            seats={hall.seats}
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </>
            )}
        </PageComponent>
    );
}
