import React from 'react'

export default function MovieListUserItem({ movie }) {
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
            <div>
                Зал 1
            </div>
            <div>
                Зал 2
            </div>
        </section>
    )
}



