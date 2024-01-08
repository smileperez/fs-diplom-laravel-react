import { useEffect, useState } from "react";

export default function ESeat({ row, seat, selectedCoords }) {
    // Состояние для хранения координаты
    const [coords, setCoords] = useState();

    // Состояние для хранения цвета

    const [index, setIndex] = useState(0);

    const [bgcolor, setBgcolor] = useState('63536C');

    const colors = [
        '63536C',
        'cfb53b',
        'c0c0c0',
        'FFFFFF',
        '000000',
    ];

    const changeColor = (colors) => {

        if (index == colors.length - 1) {
            setIndex(0);
        } else {
            setIndex(index + 1);
        }
        setBgcolor(`bg-[#${colors[index]}]`);
        console.log(bgcolor);
    }

    // Функция детектирования кликов по <ESeat> и отправки координат в родитель <MatrixComponent> -> в родитель <Config>
    function onMouseEnter(event, row, seat) {
        setCoords({ row, seat });
        changeColor(colors);
    }

    // Отправка координат в родитель <MatrixComponent> -> в родитель <Config>, как только setCoords обновит состояние coords
    useEffect(() => {
        selectedCoords(coords);
    }, [coords]);

    return (
        <div
            className={`text-xs text-white inline-block cursor-pointer w-[24px] h-[24px] border border-gray-400 rounded ${bgcolor}`}
            onClick={(event) => onMouseEnter(event, row, seat)}
        ></div>
    );
}
