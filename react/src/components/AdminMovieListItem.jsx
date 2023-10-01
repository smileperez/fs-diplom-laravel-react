import React from "react";

export default function AdminMovieListItem({ movie }) {
    return (
        <section className="mt-8 h-100 bg-[#F1EBE6]/95 p-3.5 rounded">
            <div className="flex">
                <div className="pl-4">
                    <img
                        className="relative rounded -top-7 max-w-[8rem] min-w-[8rem] max-h-[12rem]"
                        alt={movie.title}
                        src={movie.img_url}
                    ></img>
                    <h2 className="text-base font-bold">{movie.id}</h2>
                    <h2 className="text-base font-bold">{movie.title}</h2>
                    <p className="text-sm mt-2.5 font-light">
                        {movie.duration} минут
                    </p>
                </div>
            </div>
        </section>
    );
}
