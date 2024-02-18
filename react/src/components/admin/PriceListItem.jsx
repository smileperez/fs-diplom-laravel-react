import SlidePopupComponent from "../core/SlidePopupComponent";
import EButton from "../core/EButton";
import ESelection from "../core/ESelection";
import { useEffect, useState } from "react";
import {
    AdjustmentsHorizontalIcon,
    CloudArrowUpIcon,
    XCircleIcon
} from "@heroicons/react/24/outline";
import axiosClient from "../../axios";
import PriceListItemUnit from "../../components/admin/PriceListItemUnit";

export default function PriceListItem({ hall, types }) {
    // Открытие/Закрытие SlidePopupComponent изменения
    const [change, setChange] = useState(false);

    const [prices, setPrices] = useState();

    // Состояния для изменения зала
    const [updatedPrice, setUpdatedPrice] = useState([]);

    // Состояние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Отправка put-request в БД c изменениями зала
    const onSubmit = (event) => {
        event.preventDefault();
        console.log(prices);
        console.log(updatedPrice);
    };

    const getPrices = (hall) => {
        setLoading(true);
        axiosClient
            .get(`/prices/${hall.id}`)
            .then(({ data }) => {
                setPrices(data);
                setLoading(false);
            });
    };

    // const array = [];
    // TODO:
    const pushUpdatedPrice = (updatedPriceFromUnit) => {
        setUpdatedPrice({
            ...updatedPrice,
            [updatedPriceFromUnit]: updatedPriceFromUnit
        })

        console.log('Тык');
        console.log(updatedPrice);
    };

    useEffect(() => {
        if (updatedPrice) {
            console.log(updatedPrice);
        }
    }, [updatedPrice]);

    useEffect(() => {
        getPrices(hall);
    }, []);

    return (
        <>
            <section className="mb-4 flex h-auto">
                <div className="p-2 bg-[#F1EBE6]/95 rounded min-w-[40px] max-w-[40px] flex items-center justify-center">
                    <h2 className="text-xl font-bold">{hall.id}</h2>
                </div>
                <div className="flex flex-1 justify-between h-18 ml-2 p-2 bg-[#F1EBE6]/95 rounded">
                    <div className="flex">
                        <div className="w-auto">
                            <h2 className="text-sm font-light">
                                Название зала:{" "}
                                <ESelection>{hall.name}</ESelection>
                            </h2>
                            <h2 className="text-sm font-light mt-1">
                                Конфигурация зала:{" "}
                                <ESelection>
                                    {hall.rows} x {hall.seats}
                                </ESelection>
                            </h2>
                        </div>
                        <div className="ml-6">
                            <h2 className="text-sm font-light">
                                Общее кол-во мест:{" "}
                                <ESelection>
                                    {hall.rows * hall.seats}
                                </ESelection>
                            </h2>
                            <h2 className="text-sm font-light mt-1">
                                Количество VIP мест:{" "}
                                <ESelection color="b89e14">
                                    {hall.seats}
                                </ESelection>
                            </h2>
                        </div>
                    </div>
                    <div className="flex items-center">
                        <EButton circle onClick={() => {
                            setChange(true);
                        }}>
                            <AdjustmentsHorizontalIcon className="w-6 h-7" />
                        </EButton>
                    </div>
                </div>
            </section>

            {/* Slide-Popup для ИЗМЕНЕНИЯ цен */}
            <SlidePopupComponent
                open={change}
                setOpen={setChange}
                title={`Изменение цен зала №` + hall.id}
            >
                {error && (
                    <div className="bg-red-500 text-white text-sm py-2 px-2 mb-1 rounded">
                        {error}
                    </div>
                )}

                {loading && (
                    <div className="text-center text-lg">Загрузка данных...</div>
                )}

                <>
                    <form onSubmit={onSubmit} action="#" method="POST">
                        {/* Количество рядов X Количество мест в ряду */}
                        {!loading && prices?.map((item, idx) => (
                            <PriceListItemUnit
                                hall={hall.id}
                                type={item.types_id}
                                price={item.price}
                                types={types}
                                pushUpdatedPrice={pushUpdatedPrice}
                                key={idx}
                            />
                        ))}


                        <div className="mt-2">
                            <label
                                htmlFor="config"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            ></label>
                        </div>



                        <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                            <EButton submit color="regular">
                                <CloudArrowUpIcon className="h-6 w-6 mr-2" />
                                Изменить
                            </EButton>
                            <EButton color="gray" onClick={() => setChange(false)}>
                                <XCircleIcon className="h-6 w-6 mr-2" />
                                Отменить
                            </EButton>
                        </div>
                    </form>

                </>


            </SlidePopupComponent>
            {/* Slide-Popup для ИЗМЕНЕНИЯ  фильма */}
        </>
    );
}
