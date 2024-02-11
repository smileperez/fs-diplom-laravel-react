import { useEffect, useState } from "react";
import reshapeMatrix from "../core/ReshapeMatrix.jsx";

export default function MatrixComponent({
    matrixSeats,
    rows,
    seats,
    selectedCoords,
}) {

    // FIXME:
    // Состояние для получения цвета из Parent
    // const [switchedColor, setSwitchedColor] = useState("63536C");

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Создание матрицы на основе данных из родителя <Config>
    const [matrix, setMatrix] = useState(reshapeMatrix(matrixSeats, rows, seats));

    // Состояние для хранения координаты
    const [coords, setCoords] = useState();

    const [bgcolor, setBgcolor] = useState('63536C');

    // Функция детектирования кликов и отправки координат в родитель <MatrixComponent> -> в родитель <Config>
    function onMouseEnter(event, row, seat) {
        setCoords({ row, seat });
    }

    // Отправка координат в родитель <MatrixComponent> -> в родитель <Config>, как только setCoords обновит состояние coords
    useEffect(() => {
        selectedCoords(coords);
    }, [coords]);

    // Обновляем рендеринг матрицы, если matrixSeats поменялся
    useEffect(() => {
        setMatrix(reshapeMatrix(matrixSeats, rows, seats));
    }, [matrixSeats]);

    return (
        <div className="flex flex-col flex-nowrap space-y-2">
            {matrix.map((row, i) => (
                <div key={i} className="flex flex-nowrap space-x-2">
                    {row.map((item, j) => (
                        <div key={item.row.toString() + item.seat.toString()}
                            className={`text-xs text-white inline-block cursor-pointer w-[24px] h-[24px] border border-gray-400 rounded bg-[#${bgcolor}]`}
                            onClick={(event) => onMouseEnter(event, item.row, item.seat)}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
}
