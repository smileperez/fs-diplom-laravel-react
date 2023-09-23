import { useStateContext } from "../../context/ContextProvider";
import MovieListItem from "../../components/MovieListItem";

export default function Tickets() {

    const { movies } = useStateContext();
    console.log(movies);

    return (
        <>
            <nav className="h-100 bg-white">
                Nav
            </nav>

            <main>
                {movies.map(movie => (
                    <MovieListItem movie={movie} key={movie.id} />
                ))}
            </main>
        </>
    )
}
