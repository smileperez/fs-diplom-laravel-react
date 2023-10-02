import { useStateContext } from "../../context/ContextProvider";
import MovieListItemUser from "../../components/guest/MovieListItemUser";
import NavItem from "../../components/guest/NavItem";
import { useState } from "react";

export default function Tickets() {
    const [weekend, setWeekend] = useState();

    const { movies } = useStateContext();
    const { calendar } = useStateContext();

    return (
        <>
            <nav className="h-100 flex justify-between">
                {calendar.map((day) => (
                    <NavItem day={day} key={day.day} />
                ))}

                <div className="bg-white p-3 ml-px"></div>
            </nav>

            <main>
                {movies.map((movie) => (
                    <MovieListItemUser movie={movie} key={movie.id} />
                ))}
            </main>
        </>
    );
}
