import { useState, useEffect } from "react";

export default function PriceListItemUnit({ hall, type, price, types, pushUpdatedPrice }) {

    const [id, setId] = useState(type);
    // Состояния для изменения зала
    const [updatedPrice, setUpdatedPrice] = useState();

    // Состояние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Отправка put-request в БД c изменениями зала
    const onSubmit = (event) => {
        event.preventDefault();
        // console.log(prices);
        // console.log(updatedPrice);
    };

    // TODO:
    useEffect(() => {
        pushUpdatedPrice(updatedPrice);
    }, [updatedPrice]);

    return (
        <>
            <div className="mb-6">
                <div className="mt-2">
                    {/* <label
                        htmlFor="rows"
                        className="block text-sm font-medium leading-3 text-gray-900"
                    >
                        Цена, рублей
                    </label> */}
                </div>

                <div className="flex mt-2">
                    <div className="flex flex-col justify-center">
                        <label
                            className="block mb-2 text-sm font-medium leading-3 text-gray-900"
                        >
                            Место
                        </label>
                        <div className={`bg-[#${types[type].color}] w-[100px] text-center inline-block text-white  px-2 py-1 rounded text-s border border-gray-500 font-medium`}>{types[type].type}</div>
                    </div>

                    <span className="mx-5">=</span>
                    <div className="flex flex-col">
                        <label
                            htmlFor="rows"
                            className="block mb-2 text-sm font-medium leading-3 text-gray-900"
                        >
                            Цена, рублей
                        </label>
                        <input
                            type="number"
                            id="price"
                            name={type}
                            value={price}
                            onChange={(event) => {
                                setUpdatedPrice({
                                    [event.target.name]: Number(event.target.value)
                                });

                            }

                            }
                            className="block w-[100px] rounded border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#63536C] sm:text-sm sm:leading-6"
                        />
                    </div>

                </div>
            </div>
        </>
    );
}
