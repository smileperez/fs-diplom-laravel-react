import { useEffect, useState } from "react";
import ESeat from "../core/ESeat";
import axiosClient from "../../axios";
import makeMatrix from "../core/MakeMatrix.jsx";

export default function MatrixComponent({
    hall_id,
    rows,
    seats,
    selectedCoords,
    createdMatrix,
}) {

    // FIXME:
    // Состояние для получения цвета из Parent
    // const [switchedColor, setSwitchedColor] = useState("63536C");

    // Создание матрицы на основе данных из родителя <Config>
    const matrix = makeMatrix(rows, seats);

    // Состояние для хранения координаты
    const [coords, setCoords] = useState();

    const [index, setIndex] = useState(0);

    const [bgcolor, setBgcolor] = useState('63536C');

    const [matrixSeats, setMatrixSeats] = useState();

    const colors = [
        '63536C',
        'cfb53b',
        'c0c0c0',
        'FFFFFF',
        '000000',
    ];

    // Передача созданной матрицы в компонент родитель <Config>
    // useEffect(() => {
    //     if (matrix) {
    //         createdMatrix(matrix);
    //     }
    // }, []);

    // Функция получения матрицы сидушек из БД для конкретного зала
    const getSeats = () => {
        setLoading(true);
        axiosClient
            .get(`/seats/${hall_id}`)
            .then(({ data }) => {
                setMatrixSeats(data.data);
                console.log(data.data);
                setLoading(false);
            });
    };

    // Функция детектирования кликов и отправки координат в родитель <MatrixComponent> -> в родитель <Config>
    function onMouseEnter(event, row, seat) {
        setCoords({ row, seat });
        // changeColor(colors);
    }

    // Отправка координат в родитель <MatrixComponent> -> в родитель <Config>, как только setCoords обновит состояние coords
    useEffect(() => {
        selectedCoords(coords);
    }, [coords]);

    // const changeColor = (colors) => {

    //     if (index == colors.length - 1) {
    //         setIndex(0);
    //     } else {
    //         setIndex(index + 1);
    //     }
    //     setBgcolor(`bg-[#${colors[index]}]`);
    //     console.log(bgcolor);
    // }

    return (
        <div className="flex flex-col flex-nowrap space-y-2">
            {matrix.map((row, i) => (
                <div key={i} className="flex flex-nowrap space-x-2">
                    {row.map((item, j) => (
                        <div
                            className={`text-xs text-white inline-block cursor-pointer w-[24px] h-[24px] border border-gray-400 rounded ${bgcolor}`}
                            onClick={(event) => onMouseEnter(event, item.row, item.seat)}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
}
