import { useEffect, useState } from "react";
import ESeat from "../core/ESeat";

// Функция создания матрицы
const makeMatrix = (rows, seats) => {
    // Единица добавлена, чтобы в дальгейшем удалить индекс [0], чтобы привести массив мест к виду [1, 2, 3...]
    const seatsPlus = seats + 1;
    const line = [];
    for (let row = 1; row < rows + 1; row++) {
        const column = Array.from({ length: seatsPlus }, (__, seat) => {
            return { row, seat };
        });
        // Приводим массив мест к виду к виду [1, 2, 3...]. 
        //Делаем начало индексов массива мест начиная с 1.
        column.shift();
        // Добавляем полученную "линию" мест в "ряды".
        line.push(column);
    }
    return line;
};

export default function MatrixComponent({
    rows,
    seats,
    selectedCoords,
    color,
    createdMatrix,
}) {
    // Состояние для хранения координаты
    const [coords, setCoords] = useState({ row: -1, seat: -1 });

    // FIXME:
    // Состояние для получения цвета из Parent
    // const [switchedColor, setSwitchedColor] = useState("63536C");

    // Состояние для создания запроса в БД
    // const [data, setData] = useState({});

    // Создание матрицы на основе данных из Parent
    const matrix = makeMatrix(rows, seats);

    // Получение коррдинат по клику
    // function onMouseEnter(event, x, y) {
    // setCoords({ y, x });
    // selectedCoords(coords);
    // }

    // Callback функция. Получение координат от компонента <ESeat>
    const getCoord = (coord) => {
        setCoords(coord);
    };
    // console.log(coords);

    // Отправка координат в Parent
    // if (coords) {
    //     selectedCoords(coords);
    // }

    // Передача созданной матрицы в родитель компонент <Config>
    useEffect(() => {
        if (matrix) {
            createdMatrix(matrix);
        }
    }, []);

    return (
        <div className="flex flex-col flex-nowrap space-y-2">
            {matrix.map((row, i) => (
                <div key={i} className="flex flex-nowrap space-x-2">
                    {row.map((item, j) => (
                        <>
                            {/* {console.log(item)} */}
                            <ESeat
                                key={j}
                                getCoord={getCoord}
                                x={item.row}
                                y={item.seat}
                            />
                            {/* <div
                                className={`text-xs text-white inline-block cursor-pointer w-[24px] h-[24px] border border-gray-400 rounded bg-[#63536C]`}
                                key={j}
                                onClick={(event) =>
                                    onMouseEnter(event, item.y, item.x)
                                }
                            ></div> */}
                        </>
                    ))}
                </div>
            ))}
        </div>
    );
}
