import { Link } from "react-router-dom";

export default function NavItem({ day }) {

    if (day.weekend === 'false') {
        day.weekend = false;
    }

    return (
        <Link className={`${day.weekend ? 'text-red-500' : 'text-black'} block bg-white/95 py-2.5 px-5 ml-px rounded text-xs cursor-pointer`}>
            {day.name_of_day}, {day.day}
        </Link>
    )
}
