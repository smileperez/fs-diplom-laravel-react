import PageComponent from "../../components/admin/PageComponent";
import SlidePopupComponent from "../../components/core/SlidePopupComponent";
import HallListItem from "../../components/admin/HallListItem";
import EButton from "../../components/core/EButton";
import { useStateContext } from "../../context/ContextProvider";
import { useEffect, useState } from "react";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import axiosClient from "../../axios.js";
import PaginationComponent from "../../components/admin/PaginationComponent";

export default function Halls() {
    // Состояние для загрузки из БД общего списка залов
    const [halls, setHalls] = useState([]);

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Соятоние для meta, полученной с ответом на запрос данных из БД (для pagination)
    const [meta, setMeta] = useState({});

    // Состояния для открытия/закрытия в SlidePopupComponent
    const [open, setOpen] = useState(false);

    // Состояния для добавления нового зала
    const [hall, setHall] = useState({
        name: "",
        rows: null,
        seats: null,
    });

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Загрузка списка залов при обновлении страницы
    useEffect(() => {
        setLoading(true);
        axiosClient.get("/halls").then(({ data }) => {
            setHalls(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    }, []);

    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getHalls = (url) => {
        url = url || "/halls";
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setHalls(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };
    // При каждом обновлении страницы обновляем URL страниц пагинации (для компонента PaginationComponent)
    useEffect(() => {
        getHalls();
    }, []);
    // Callback для пагинации (компонент PaginationComponent)
    const onPageClick = (link) => {
        getHalls(link.url);
    };

    // Отправка request в БД с новым залом
    const onSubmit = (event) => {
        event.preventDefault();

        const payload = { ...hall };

        axiosClient
            .post("/halls", payload)
            .then((response) => {
                console.log(response);
                // Закрываем slider-popup
                setOpen(false);
                // Перезагружаем страницу
                window.location.reload();
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
        <PageComponent
            title="Управление залами"
            button={
                <EButton color="regular" onClick={() => setOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6" />
                    <div className="hidden md:ml-2 md:block">Добавить зал</div>
                </EButton>
            }
        >
            {loading && <div className="text-center text-lg">Loading...</div>}

            {!loading && (
                <div>
                    {halls.map((hall) => (
                        <HallListItem hall={hall} key={hall.id} />
                    ))}
                    <PaginationComponent
                        meta={meta}
                        onPageClick={onPageClick}
                    />
                </div>
            )}

            {/* Slide-Popup для добавления нового зала */}
            <SlidePopupComponent
                open={open}
                setOpen={setOpen}
                title="Добавление нового зала"
            >
                {error && (
                    <div className="bg-red-500 text-white text-sm py-2 px-2 mb-1 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} action="#" method="POST">
                    {/* Название зала */}
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
                                type="text"
                                id="name"
                                name="name"
                                value={hall.name}
                                onChange={(event) =>
                                    setHall({
                                        ...hall,
                                        name: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Название зала */}

                    {/* Количество рядов */}
                    <div className="mt-2">
                        <label
                            htmlFor="rows"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Количество рядов
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="rows"
                                name="rows"
                                value={hall.rows}
                                onChange={(event) =>
                                    setHall({
                                        ...hall,
                                        rows: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Количество рядов */}

                    {/* Количество мест в ряду */}
                    <div className="mt-2">
                        <label
                            htmlFor="seats"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Количество мест в ряду
                        </label>
                        <div className="mt-2">
                            <input
                                type="number"
                                id="seats"
                                name="seats"
                                value={hall.seats}
                                onChange={(event) =>
                                    setHall({
                                        ...hall,
                                        seats: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Количество мест в ряду */}

                    <div className="flex justify-between mt-6">
                        <EButton submit>
                            <PlusCircleIcon className="h-6 w-6 mr-2" />
                            Добавить
                        </EButton>

                        <EButton onClick={() => setOpen(false)}>
                            <XCircleIcon className="h-6 w-6 mr-2" />
                            Отменить
                        </EButton>
                    </div>
                </form>
            </SlidePopupComponent>
        </PageComponent>
    );
}
