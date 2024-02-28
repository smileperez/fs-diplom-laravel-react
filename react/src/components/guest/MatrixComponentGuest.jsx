import { useEffect, useState } from "react";
import reshapeMatrix from "../core/ReshapeMatrix.jsx";
import Seat from "./Seat.jsx";

export default function MatrixComponentGuest({
    matrixSeats,
    rows,
    seats,
    types,
    sendCoord,
    reservedSeats
}) {

    // Создание матрицы на основе данных из родителя <Config>
    const [matrix, setMatrix] = useState(reshapeMatrix(matrixSeats, rows, seats));

    // Состояние для хранения координаты
    const [coords, setCoords] = useState();

    // Обновляем рендеринг матрицы, если matrixSeats из родителя <Config> поменялся
    useEffect(() => {
        setMatrix(reshapeMatrix(matrixSeats, rows, seats));
    }, [matrixSeats]);

    return (
        <div className="flex flex-col flex-nowrap space-y-2">
            {matrix?.map((row, idx) => (
                <div key={row[idx].row + row[idx].seat} className="flex flex-nowrap space-x-2">
                    {row.map((item, jdx) => (
                        <>
                            <Seat
                                item={item}
                                types={types}
                                key={item.seat}
                                sendCoord={sendCoord}
                                reservedSeats={reservedSeats}
                            >
                            </Seat>
                        </>
                    ))}
                </div>
            ))}
        </div>
    );
}
