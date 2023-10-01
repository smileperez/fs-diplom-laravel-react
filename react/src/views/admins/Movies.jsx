import AdminMovieListItem from "../../components/AdminMovieListItem";
import PageComponent from "../../components/PageComponent";
import { useStateContext } from "../../context/ContextProvider";

export default function Movies() {
    const { movies } = useStateContext();

    return (
        <PageComponent title="Управление фильмами">
            <div>
                {movies.map((movie) => (
                    <AdminMovieListItem movie={movie} key={movie.id} />
                ))}
            </div>
        </PageComponent>
    );
}
