import { useEffect, useState } from "react";
import PageComponent from "../../components/admin/PageComponent";
import EButton from "../../components/core/EButton";
import { PlusCircleIcon, XCircleIcon } from "@heroicons/react/24/outline";
import SlidePopupComponent from "../../components/core/SlidePopupComponent";
import axiosClient from "../../axios";
import PaginationComponent from "../../components/admin/PaginationComponent";
import SeatTypesItem from "../../components/admin/SeatTypesItem";

export default function SeatTypes() {
    // Состояние для загрузки из БД общего списка типов мест
    const [seatTypes, setSeatTypes] = useState([]);

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Соятоние для meta, полученной с ответом на запрос данных из БД (для pagination)
    const [meta, setMeta] = useState({});

    // Состояния для открытия/закрытия в SlidePopupComponent
    const [open, setOpen] = useState(false);

    // Состояния для добавления нового типа места
    const [seatType, setSeatType] = useState({
        type: "",
    });

    // FIXME:
    // Состояние для хранения ошибки
    // const [error, setError] = useState("");

    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getSeatTypes = (url) => {
        url = url || "/seattypes";
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setSeatTypes(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };

    // При каждом обновлении страницы обновляем URL страниц пагинации (для компонента PaginationComponent)
    useEffect(() => {
        getSeatTypes();
    }, []);

    // Callback для пагинации (компонент PaginationComponent)
    const onPageClick = (link) => {
        getSeatTypes(link.url);
    };

    // Отправка request в БД с новым типом места
    const onSubmit = (event) => {
        event.preventDefault();
        const payload = { ...seatType };
        axiosClient
            .post("/seattypes", payload)
            .then((response) => {
                console.log(response);
                // Закрываем slider-popup
                // setOpen(false);
                // Перезагружаем страницу
                // window.location.reload();
            })
            .catch((err) => {
                if (err && err.response) {
                    // Записываем error в состояние
                    // setError(err.response.data.message);
                }
                // console.log(err, err.response);
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
                    {/* // TODO: */}
                    {seatTypes.map((type) => (
                        <SeatTypesItem seatType={type} key={type.id} />
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
                    {/* Название типа */}
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
                                value={seatType.type}
                                onChange={(event) =>
                                    setSeatType({
                                        ...seatType,
                                        type: event.target.value,
                                    })
                                }
                                className="block w-full rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                            />
                        </div>
                    </div>
                    {/* Название зала */}

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
