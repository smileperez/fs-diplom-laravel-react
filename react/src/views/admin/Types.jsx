import { useEffect, useState } from "react";
import PageComponent from "../../components/admin/PageComponent";
import EButton from "../../components/core/EButton";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import SlidePopupComponent from "../../components/core/SlidePopupComponent";
import axiosClient from "../../axios";
import PaginationComponent from "../../components/admin/PaginationComponent";
import TypeItem from "../../components/admin/TypeItem";

export default function Types() {
    // Состояние для загрузки из БД общего списка типов мест
    const [types, setTypes] = useState([]);

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Соятоние для meta, полученной с ответом на запрос данных из БД (для pagination)
    const [meta, setMeta] = useState({});

    // Состояния для открытия/закрытия в SlidePopupComponent
    const [open, setOpen] = useState(false);

    // Состояния для добавления нового типа места
    const [newType, setNewType] = useState({
        type: "",
        color: "63536C",
    });

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getTypes = (url) => {
        url = url || "/types";
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setTypes(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };

    // При каждом обновлении страницы обновляем URL страниц пагинации (для компонента PaginationComponent)
    useEffect(() => {
        getTypes();
    }, []);

    // Callback для пагинации (компонент PaginationComponent)
    const onPageClick = (link) => {
        getTypes(link.url);
    };

    // Отправка request в БД с новым типом места
    const onSubmit = (event) => {
        event.preventDefault();

        const payload = { ...newType };
        axiosClient
            .post("/types", payload)
            .then((response) => {
                console.log(response);
                // Закрываем slider-popup
                setOpen(false);
                // Перезагружаем страницу
                getTypes();
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
            title="Настройка мест"
            button={
                <EButton color="regular" onClick={() => setOpen(true)}>
                    <PlusCircleIcon className="h-6 w-6" />
                    <div className="hidden md:ml-2 md:block">
                        Добавить место
                    </div>
                </EButton>
            }
        >
            {loading && (
                <div className="text-center text-lg">Загрузка данных...</div>
            )}

            {!loading && (
                <div>
                    {types.map((type) => (
                        <TypeItem type={type} getTypes={getTypes} key={type.id} />
                    ))}
                    <PaginationComponent
                        meta={meta}
                        onPageClick={onPageClick}
                    />
                </div>
            )}

            {/* Slide-Popup для ДОБАВЛЕНИЯ нового типа места */}
            <SlidePopupComponent
                open={open}
                setOpen={setOpen}
                title="Добавление нового места"
            >
                <form onSubmit={onSubmit} action="#" method="POST">
                    {/* Название типа места */}
                    <div>
                        <label
                            htmlFor="type"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Название типа места{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="type"
                                name="type"
                                value={newType.type}
                                onChange={(event) =>
                                    setNewType({
                                        ...newType,
                                        type: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Название типа места */}

                    {/* Цвет места */}
                    <div className="mt-2">
                        <label
                            htmlFor="color"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Цвет места (HEX 6 символов)
                        </label>
                        <div className="mt-2">
                            <input
                                type="text"
                                id="color"
                                name="color"
                                value={newType.color}
                                onChange={(event) =>
                                    setNewType({
                                        ...newType,
                                        color: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Цвет места */}

                    <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                        <EButton submit>
                            <PlusCircleIcon className="h-6 w-6 mr-2" />
                            Добавить
                        </EButton>

                        <EButton color="gray" onClick={() => setOpen(false)}>
                            <XCircleIcon className="h-6 w-6 mr-2" />
                            Отменить
                        </EButton>
                    </div>
                </form>
            </SlidePopupComponent>
        </PageComponent>
    );
}
