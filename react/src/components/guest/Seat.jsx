import { useState } from "react";

export default function HallsListItem({ item, types }) {

    // Состояние для переключения выбранного места
    const [toggle, setToggle] = useState(false);

    // Диначически заданный стиль сидушек
    const seatStyle = {
        visibility: item?.types_id === 3 ? "hidden" : "",
        backgroundColor: toggle ? `#25C4CE` : `#${types?.find(type => type.id === item.types_id).color}`
    }

    // Состояние для хранения координаты
    const [coords, setCoords] = useState();

    // Функция детектирования выбора места при клике
    function onMouseEnter(row, seat) {
        console.log('ТЫК');
        setCoords({ row, seat });
        setToggle(!toggle);
        console.log(coords);
    }

    return (
        <>
            <div style={seatStyle}
                className="cursor-pointer w-[24px] h-[24px] border border-gray-400 rounded-md"
                onClick={(event) => (
                    onMouseEnter(item.row, item.seat)
                )}
            ></div>
        </>
    )
}


{/* <div style={toggle ? { backgroundColor: "#25C4CE" } : { backgroundColor: `#${types?.find(type => type.id === item.types_id).color}` }} */ }
