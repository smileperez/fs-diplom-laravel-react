import { useEffect, useState } from "react";
import reshapeMatrix from "../core/ReshapeMatrix.jsx";
import Seat from "./Seat.jsx";

export default function MatrixComponentGuest({
    matrixSeats,
    rows,
    seats,
    types,
    sendAdjustedMatrix
}) {

    // Создание матрицы на основе данных из родителя <Config>
    const [matrix, setMatrix] = useState(reshapeMatrix(matrixSeats, rows, seats));

    // Состояние для хранения координаты
    const [coords, setCoords] = useState();

    // const [guestTypes, setGuestTypes] = useState(types?.push({ id: 4, type: 'Выбранное', color: '25C4CE' })
    // );

    const guestTypes = types?.push({ id: 4, type: 'Выбранное', color: '25C4CE' })

    const [toggle, setToggle] = useState(false);

    // Функция корректировки матрицы от изменения типов мест при клике
    function onMouseEnter(row, seat, types_id) {
        // setCoords({ row, seat });
        console.log('ТЫК');
        setToggle(!toggle);
        // console.log(toggle);
        // console.log(guestTypes);

        // Изменяем значение конкретного места в матрице на нужный тип места по кругу
        // matrix[row - 1][seat - 1].types_id = types_id + 1;

        // if (matrix[row - 1][seat - 1].types_id === 4) {
        //     matrix[row - 1][seat - 1].types_id = 1;
        // }
        // console.log(matrix[row - 1][seat - 1].types_id);
    }

    // Отправка координат в родитель <MatrixComponent> -> в родитель <Config>
    useEffect(() => {
        sendAdjustedMatrix(matrix);
    }, [matrix]);

    // Обновляем рендеринг матрицы, если matrixSeats из родителя <Config> поменялся
    useEffect(() => {
        setMatrix(reshapeMatrix(matrixSeats, rows, seats));
    }, [matrixSeats]);

    return (
        <div className="flex flex-col flex-nowrap space-y-2">
            {matrix.map((row, i) => (
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
