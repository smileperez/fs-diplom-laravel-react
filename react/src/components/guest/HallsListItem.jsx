import React from 'react';
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";

export default function HallsListItem({ hall, sessions, movie }) {

    // Состояние для загрузки из БД общего списка фильмов
    const [sessionByHall, setSessionByHall] = useState();

    // Функция получения массива сессий по залу
    const getSessionsByHall = () => {
        if (sessions) {
            setSessionByHall(sessions?.filter((item) => item.halls_id === hall.id));

        }
    };

    // При каждом обновлении страницы обновляем список фильмов
    useEffect(() => {
        if (hall && sessions) {
            getSessionsByHall();
        }
    }, []);


    return (
        <>
            <div className='mb-2'>
                <div className='font-medium text-lg'>
                    <span>Зал - {hall.name}</span>
                </div>
                <div className='flex'>
                    {sessionByHall?.map((item) => (
                        <>
                            <div className='mr-2 bg-white p-2 rounded cursor-pointer shadow-md' onClick={() => (console.log('ТЫК'))}>
                                {item.sessionStart}
                            </div>
                        </>
                    ))}
                </div>
            </div>
        </>
    )
}
