import { useEffect, useState } from "react";
import PageComponent from "../../components/admin/PageComponent";
import axiosClient from "../../axios";
import MatrixComponent from "../../components/admin/MatrixComponent";
import SelectMenusComponent from "../../components/core/SelectMenusComponent";
import ESelection from "../../components/core/ESelection";
import EButton from "../../components/core/EButton";
import { CloudArrowUpIcon, XCircleIcon } from "@heroicons/react/24/outline";

export default function Config() {
    // Состояние для загрузки залов из БД
    const [halls, setHalls] = useState([]);

    // Состояние для выбора конкретного зала
    const [hall, setHall] = useState();

    // Состояние для загрузки всех типов мест из БД
    const [types, setTypes] = useState([]);

    // Соятоние загрузки данных
    const [loading, setLoading] = useState(false);

    //
    const [coord, setCoord] = useState({ row: -1, seat: -1 });

    //
    // const [color, setColor] = useState("63536C");

    //
    // const [currentMatrix, setCurrentMatrix] = useState();

    // Полученный из БД массив сидушек для конкретного зала.
    const [matrixSeats, setMatrixSeats] = useState();

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения списка залов из БД
    useEffect(() => {
        setLoading(true);
        axiosClient
            .get("/halls")
            .then(({ data }) => {
                setHalls(data.data);
                getTypes();
            });
    }, []);

    // Функция получения списка типов мест из БД
    const getTypes = () => {
        axiosClient
            .get("/types")
            .then(({ data }) => {
                setTypes(data.data);
                setLoading(false);
            });
    };

    // Функция получения матрицы сидушек из БД для конкретного зала
    const getSeats = (hall_id) => {
        axiosClient
            .get(`/seats/${hall_id}`)
            .then(({ data }) => {
                setMatrixSeats(data);
                setLoading(false);
            });
    };

    // Функция автообновления матрицы сидушек из БД,
    // в момент когда пользователь тынкул на конкретный зал в выпадающем списке.
    useEffect(() => {
        if (hall) {
            getSeats(hall.id);
        }
    }, [hall]);

    // callback функция, для получения выбранного зала из под компонента <SelectMenusComponent>
    const selectedHall = (hall) => {
        setHall(hall);
    };


    // callback функция, для получения координат места из под компонента <MatrixComponent>
    const selectedCoords = (coord) => {
        setCoord(coord);
    };

    // Функция для выведения координваты в консоль для отладки
    useEffect(() => {
        if (coord) {
            console.log(coord);
        }
    }, [coord]);

    // callback функция, для получения матрицы координат  из под компонента <MatrixComponent>
    const createdMatrix = (matrix) => {
        setCurrentMatrix(matrix);
    };

    // Отправка матрицы в БД
    const onClickSubmit = (event) => {
        const matrix = { ...currentMatrix };
        let payload = new Array();

        for (let key in matrix) {
            for (let index in matrix[key]) {
                payload = [...payload, matrix[key][index]];
            }
        }

        payload.forEach((item) => {
            item.halls_id = hall.id;
            item.types_id = 1;
        });

        axiosClient
            .post("/seats", payload)
            .then((response) => {
                console.log(response);
            })
            .catch((err) => {
                if (err && err.response) {
                    // Записываем error в состояние
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
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
                            Выберите доступный зал для конфигурации:
                        </h2>
                        <SelectMenusComponent
                            selectedHall={selectedHall}
                            items={halls}
                            key={halls.id}
                        />
                    </div>

                    <div className="flex flex-col mt-3 pt-1 border-t border-gray-200">
                        <h2 className="font-semibold">Доступные типы мест:</h2>
                        {types.length === 0 && (
                            <h2 className="text-sm font-normal text-gray-400">
                                Нет доступных типов мест
                            </h2>
                        )}
                        {types.length > 0 && (
                            <>
                                <div className="flex flex-wrap mt-1">
                                    {types.map((type, idx) => (
                                        <div
                                            className="mt-1 mr-2 last:mr-0"
                                            key={idx}
                                        >
                                            <ESelection color={type.color}>
                                                <span>
                                                    ID:{type.id} - {type.type}
                                                </span>
                                            </ESelection>
                                        </div>
                                    ))}
                                </div>
                                <h2 className="text-sm font-normal text-gray-400">
                                    Чтобы изменить тип кресла, нажмите по нему
                                    левой кнопкой мыши
                                </h2>
                                <div className="mt-3 pt-1 border-t border-gray-200">
                                    <h2 className="font-semibold">
                                        Конфигурация мест:
                                    </h2>
                                    <div className="border-2 border-[#63536C] rounded p-3 mt-2">
                                        {!hall && (
                                            <span className="text-sm font-normal text-gray-400">
                                                Для отображения конфигурации
                                                выберите зал
                                            </span>
                                        )}
                                        {hall && (
                                            <div className="flex flex-col justify-center items-center">
                                                <span className="tracking-[1.25em]">
                                                    ЭКРАН
                                                </span>
                                                <div className="mt-2">
                                                    <MatrixComponent
                                                        matrixSeats={matrixSeats}
                                                        hall={hall}
                                                        rows={hall.rows}
                                                        seats={hall.seats}
                                                        selectedCoords={
                                                            selectedCoords
                                                        }
                                                        createdMatrix={
                                                            createdMatrix
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        )}

                                        <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                                            <EButton
                                                color="regular"
                                                onClick={onClickSubmit}
                                            >
                                                <CloudArrowUpIcon className="h-6 w-6 mr-2" />
                                                Сохранить
                                            </EButton>
                                            <EButton color="gray" onClick="#">
                                                <XCircleIcon className="h-6 w-6 mr-2" />
                                                Отменить
                                            </EButton>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </>
            )}
        </PageComponent>
    );
}
