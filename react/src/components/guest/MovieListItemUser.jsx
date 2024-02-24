import HallsListItem from "../../components/guest/HallsListItem.jsx";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";

export default function MovieListItemUser({ movie }) {

    // Состояние для загрузки из БД общего списка фильмов
    const [sessions, setSessions] = useState();

    // Состояние для загрузки из БД общего списка фильмов
    const [halls, setHalls] = useState();

    // Состояние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Функция получения всех сессий по конкретному фильму
    const getSessions = () => {
        setLoading(true)
        axiosClient
            .get(`/getsessions/${movie.id}`)
            .then(({ data }) => {
                setSessions(data);
            });
    };

    // Функция получения всех сессий по конкретному фильму
    const getHalls = () => {
        axiosClient
            .get(`/gethalls`)
            .then(({ data }) => {
                setHalls(data.data);
                setLoading(false)
            });
    };

    // При каждом обновлении страницы обновляем список фильмов
    useEffect(() => {
        if (movie) {
            getSessions();
            getHalls();
        }
    }, [movie]);

    return (
        <section className="mt-8 h-100 bg-[#F1EBE6]/95 p-3.5 rounded">
            <div className="flex">
                <div className="relative after:content-[''] after:block after:absolute after:-right-[7px] after:-top-[25px] after:border-t-[11px] after:border-solid after:border-transparent after:border-b-0 after:border-r-0 after:border-l-[7px] after:border-l-[#772720]">
                    <img className="relative rounded -top-7 max-w-[8rem] min-w-[8rem] max-h-[12rem]" alt={movie.title} src={movie.img_url}></img>
                </div>
                <div className="pl-4">
                    <h2 className="text-base font-bold">
                        {movie.title}
                    </h2>
                    <p className="text-sm mt-2.5" dangerouslySetInnerHTML={{ __html: movie.description }}>
                    </p>
                    <p className="text-sm mt-2.5 font-light">
                        {movie.duration} минут
                    </p>
                    <p className="text-sm mt-2.5 font-light">
                        {movie.origin}
                    </p>
                </div>
            </div>

            {loading && (
                <div className='mb-2'>
                    <div className='font-normal text-lg'>
                        <span>Загрузка данных...</span>
                    </div>
                </div>
            )}

            {!loading && (
                halls?.map((item) => (
                    <HallsListItem
                        hall={item}
                        sessions={sessions}
                        movie={movie}
                        key={item.id}
                    />
                ))
            )}


        </section>
    )
}



