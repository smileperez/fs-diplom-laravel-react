import { useEffect, useState } from "react";

// Функция создания матрицы
const makeMatrix = (rows, seats) => {
    const seatsPlus = seats + 1;
    const line = [];
    for (let row = 1; row < rows + 1; row++) {
        const column = Array.from({ length: seatsPlus}, (__, seat) => {
            return { row, seat };
        });
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

    // Состояние для получения цвета из Parent
    const [switchedColor, setSwitchedColor] = useState("63536C");

    // Состояние для создания запроса в БД
    // const [data, setData] = useState({});

    // Создание матрицы на основе данных из Parent
    const matrix = makeMatrix(rows, seats);

    // Получение коррдинат по клику
    function onMouseEnter(event, x, y) {
        setCoords({ y, x });
        // selectedCoords(coords);
    }
    // Отправка координат в Parent
    selectedCoords(coords);

    // Передача матрицы в Parent
    useEffect(() => {
        createdMatrix(matrix);
    }, []);

    return (
        <div className="flex flex-col flex-nowrap space-y-2">
            {matrix.map((row, i) => (
                <div key={i} className="flex flex-nowrap space-x-2">
                    {row.map((item, j) => (
                        <div
                            className={`text-xs text-white inline-block cursor-pointer w-[24px] h-[24px] border border-gray-400 rounded bg-[#63536C]`}
                            key={j}
                            onClick={(event) =>
                                onMouseEnter(event, item.y, item.x)
                            }
                        >
                            {/* {i}
                            {j} */}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
}
