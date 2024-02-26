import { useEffect, useState } from "react";
import reshapeMatrix from "../core/ReshapeMatrix.jsx";
import Seat from "./Seat.jsx";

export default function MatrixComponentGuest({
    matrixSeats,
    rows,
    seats,
    types,
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
            {matrix?.map((row, i) => (
                <div key={i} className="flex flex-nowrap space-x-2">
                    {row.map((item, idx) => (
                        <>
                            <Seat
                                item={item}
                                types={types}
                                key={idx}
                            >
                            </Seat>
                        </>
                    ))}
                </div>
            ))}
        </div>
    );
}

// { backgroundColor: `#${types?.find(type => type.id === item.types_id).color}` }

{/* <div key={item.row.toString() + item.seat.toString()}
    style={toggle ? { backgroundColor: "#25C4CE" } : { backgroundColor: `#${types?.find(type => type.id === item.types_id).color}` }}
    className="text-xs text-white inline-block cursor-pointer w-[24px] h-[24px] border border-gray-400 rounded-md"
    onClick={(event) => (
        onMouseEnter(item.row, item.seat, item.types_id)
    )}
></div> */}
