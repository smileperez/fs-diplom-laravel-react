import PageComponent from "../../components/admin/PageComponent";
import PriceListItem from "../../components/admin/PriceListItem";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";
import PaginationComponent from "../../components/admin/PaginationComponent";

export default function Halls() {
    // Состояние общего переченя залов для загрузки из БД
    const [halls, setHalls] = useState([]);

    // Состояние для загрузки всех типов мест из БД
    const [types, setTypes] = useState([]);

    // Состояние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Состояние для meta, полученной с ответом на запрос данных из БД (для pagination)
    const [meta, setMeta] = useState({});

    // Состояние открытия/закрытия слайдера (компонент SlidePopupComponent)
    const [open, setOpen] = useState(false);

    // Состояние нового зала для добавления в таблицу БД "Halls"
    const [hall, setHall] = useState({
        name: "",
        rows: "",
        seats: "",
    });

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getHalls = (url) => {
        url = url || "/halls";
        setLoading(true);
        axiosClient
            .get(url)
            .then(({ data }) => {
                setHalls(data.data);
                setMeta(data.meta);
                getTypes();
            });
    };

    // Функция получения списка типов мест из БД
    const getTypes = () => {
        axiosClient
            .get("/types")
            .then(({ data }) => {
                setTypes(data.data);
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

    return (
        <PageComponent title="Управление ценами">
            {loading && (
                <div className="text-center text-lg">Загрузка данных...</div>
            )}

            {!loading && (
                <div>
                    {halls.slice(0).reverse().map((hall) => (
                        <PriceListItem
                            hall={hall}
                            types={types}
                            key={hall.id}
                        />
                    ))}
                    <PaginationComponent
                        meta={meta}
                        onPageClick={onPageClick}
                    />
                </div>
            )}

        </PageComponent>
    );
}
