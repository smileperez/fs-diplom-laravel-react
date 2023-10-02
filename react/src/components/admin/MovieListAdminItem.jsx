import React from "react";

export default function MovieListAdminItem({ movie }) {
    return (
        <section className="mt-4 flex">
            <div className="w-10 p-2 bg-[#F1EBE6]/95 rounded w-[50px] flex items-center justify-center">
                <h2 className="text-xl font-bold">{movie.id}</h2>
            </div>
            <div className="flex flex-1 justify-between h-[100px] ml-2 p-2 bg-[#F1EBE6]/95 rounded">
                <div className="flex">
                    <div className="flex-1 w-[70px] h-full">
                        <img
                            className="max-h-full"
                            alt={movie.title}
                            src={movie.img_url}
                        ></img>
                    </div>
                    <div className="flex flex-col">
                        <h2 className="text-lg font-bold">{movie.title}</h2>
                        <p className="text-sm font-light">
                            {movie.duration} минут
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <button
                        type="button"
                        className="border border-[#63536C] bg-[#63536C] text-gray-300 rounded-md px-4 py-2 transition duration-500 ease select-none hover:bg-gray-700 hover:text-white active:bg-[#89639e] active:duration-0 focus:outline-none focus:shadow-outline"
                    >
                        Изменить
                    </button>
                    <button
                        type="button"
                        className="border border-red-500 bg-red-500 text-gray-300 rounded-md px-4 py-2 ml-2 transition duration-500 ease select-none hover:bg-red-600 hover:text-white focus:outline-none focus:shadow-outline"
                    >
                        Удалить
                    </button>
                </div>
            </div>
        </section>
    );
}
