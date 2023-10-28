import { useEffect, useState } from "react";

export default function ESeat({ row, seat, selectedCoords }) {
    // Состояние для хранения координаты
    const [coords, setCoords] = useState();

    // Функция детектирования кликов по <ESeat> и отправки координат в родитель <MatrixComponent> -> в родитель <Config>
    function onMouseEnter(event, row, seat) {
        setCoords({ row, seat });
    }

    // Отправка координат в родитель <MatrixComponent> -> в родитель <Config>, как только setCoords обновит состояние coords
    useEffect(() => {
        selectedCoords(coords);
    }, [coords]);

    return (
        <div
            className={`text-xs text-white inline-block cursor-pointer w-[24px] h-[24px] border border-gray-400 rounded bg-[#63536C]`}
            onClick={(event) => onMouseEnter(event, row, seat)}
        ></div>
    );
}
