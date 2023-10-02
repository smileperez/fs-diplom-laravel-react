import MovieListAdminItem from "../../components/admin/MovieListAdminItem";
import PageComponent from "../../components/admin/PageComponent";
import { useStateContext } from "../../context/ContextProvider";

export default function Movies() {
    const { movies } = useStateContext();

    return (
        <PageComponent title="Управление фильмами">
            <div className="flex flex-col">
                <div className="flex justify-end">
                    <button
                        type="button"
                        className="border border-[#63536C] bg-[#63536C] text-gray-300 rounded-md w-[206px] px-4 py-2 mr-2 transition duration-500 ease select-none hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0 focus:outline-none focus:shadow-outline"
                    >
                        Добавить фильм
                    </button>
                </div>
                {movies.map((movie) => (
                    <MovieListAdminItem movie={movie} key={movie.id} />
                ))}
            </div>
        </PageComponent>
    );
}
