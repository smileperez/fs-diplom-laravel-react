import { useEffect, useState } from "react";
import ESeat from "../core/ESeat";
import axiosClient from "../../axios";
import makeMatrix from "../core/MakeMatrix.jsx";

export default function MatrixComponent({
    matrixSeats,
    hall,
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
    // console.log(matrix);

    // Состояние для хранения координаты
    const [coords, setCoords] = useState();

    const [bgcolor, setBgcolor] = useState('63536C');

    // Функция детектирования кликов и отправки координат в родитель <MatrixComponent> -> в родитель <Config>
    function onMouseEnter(event, row, seat) {
        setCoords({ row, seat });
    }

    if (matrixSeats) {
        let j = 1;
        let column = [];
        let row = [];
        // console.log(matrixSeats);
        for (let i = 0; i < matrixSeats.length; i++) {

            if (matrixSeats[i].row === j) {
                column.push(matrixSeats[i]);
                console.log('row = j, просто добавили в column');
            }
            else if (i === hall.seats*hall.rows-1) {
                row.push(column);
                console.log(`${i} = ${hall.seats*hall.rows}, завершили и добавили column в row`);
                // column.push(matrixSeats[i]);
            } else {
                j++;
                row.push(column);
                column = [];
                column.push(matrixSeats[i]);
                // row.push(column);
                console.log('row != j, стерли и добавили в column в  row');
            }
        }
        console.log(row);
    }

    // Отправка координат в родитель <MatrixComponent> -> в родитель <Config>, как только setCoords обновит состояние coords
    useEffect(() => {
        selectedCoords(coords);
    }, [coords]);

    return (
        <div className="flex flex-col flex-nowrap space-y-2">
            {matrix.map((row, i) => (
                <div key={i} className="flex flex-nowrap space-x-2">
                    {row.map((item, j) => (
                        <div
                            className={`text-xs text-white inline-block cursor-pointer w-[24px] h-[24px] border border-gray-400 rounded bg-[#${bgcolor}]`}
                            onClick={(event) => onMouseEnter(event, item.row, item.seat)}
                        ></div>
                    ))}
                </div>
            ))}
        </div>
    );
}
