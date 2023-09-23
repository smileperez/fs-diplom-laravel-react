import React from 'react'

export default function MovieListItem({ movie }) {
    return (
        <section className="mt-8 h-100 bg-white p-3.5">
            <div className="flex">
                <div>
                    Картинка
                </div>
                <div className="pl-4">
                    <h2 className="text-base font-bold">
                        {movie.title}
                    </h2>
                    <p className="text-sm mt-2.5">
                        {movie.description}
                    </p>
                    <p className="text-sm mt-2.5 font-light">
                    {movie.duration} минут {movie.origin}
                    </p>
                </div>
            </div>
            <div>
                Зал 1
            </div>
            <div>
                Зал 2
            </div>
        </section>
    )
}
