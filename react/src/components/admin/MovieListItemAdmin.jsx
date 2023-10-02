import React from "react";
import {
    AdjustmentsHorizontalIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function MovieListItemAdmin({ movie }) {
    return (
        <section className="mt-4 flex">
            <div className="p-2 bg-[#F1EBE6]/95 rounded w-[40px] flex items-center justify-center">
                <h2 className="text-lg font-bold">{movie.id}</h2>
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
                        <h2 className="text-base font-light">{movie.title}</h2>
                        <p className="text-xs font-normal mt-2">
                            <span className="inline-block w-auto px-2 py-1 bg-[#63536C] rounded text-white">
                                {movie.duration} минут
                            </span>
                        </p>
                    </div>
                </div>
                <div className="flex items-center">
                    <AdjustmentsHorizontalIcon className="block w-6 h-7 mr-4 text-[#63536C] cursor-pointer" />
                    <TrashIcon className="block w-6 h-7 mr-4 text-red-500 cursor-pointer" />
                </div>
            </div>
        </section>
    );
}
