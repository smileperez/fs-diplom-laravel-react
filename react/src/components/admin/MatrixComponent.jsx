import { useEffect, useState } from "react";
import ESeat from "../core/ESeat";

// Функция создания матрицы
const makeMatrix = (rows, seats) => {
    // Единица добавлена, чтобы в дальyейшем удалить индекс [0], чтобы привести массив сидушек к виду [1, 2, 3...]
    const seatsPlus = seats + 1;
    const line = [];
    for (let row = 1; row < rows + 1; row++) {
        const column = Array.from({ length: seatsPlus }, (__, seat) => {
            return { row, seat };
        });
        // Приводим массив мест к виду к виду [1, 2, 3...].
        // Делаем начало индексов массива мест начиная с 1.
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

    // FIXME:
    // Состояние для получения цвета из Parent
    // const [switchedColor, setSwitchedColor] = useState("63536C");

    // Создание матрицы на основе данных из родителя <Config>
    const matrix = makeMatrix(rows, seats);

    // Передача созданной матрицы в компонент родитель <Config>
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
                            <ESeat
                                key={j}
                                selectedCoords={selectedCoords}
                                row={item.row}
                                seat={item.seat}
                            />
                        </>
                    ))}
                </div>
            ))}
        </div>
    );
}
