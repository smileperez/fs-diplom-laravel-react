import { useState } from "react";



export default function ESeat({ x, y, getCoord }) {
    // Состояние для хранения координаты
    const [coords, setCoords] = useState({});

    function onMouseEnter(event, x, y) {
        setCoords({ y, x });
        // selectedCoords(coords);
    }

    getCoord(coords);

    return (
        <div
            className={`text-xs text-white inline-block cursor-pointer w-[24px] h-[24px] border border-gray-400 rounded bg-[#63536C]`}
            onClick={(event) => onMouseEnter(event, x, y)}
        ></div>
    );
}
