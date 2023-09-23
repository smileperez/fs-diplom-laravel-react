import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {},
    movies: []
});

const tmpMovies = [
    {
        "id": 1,
        "title": "Звёздные войны XXIII: Атака клонированных клонов",
        "description": "Самые опасные хищники Вселенной, прибыв из глубин космоса, высаживаются на улицах маленького городка, чтобы начать свою кровавую охоту. Генетически модернизировав себя с помощью ДНК других видов, охотники стали ещё сильнее, умнее и беспощаднее.",
        "duration": 130,
        "origin": "США",
    },
    {
        "id": 2,
        "title": "Альфа",
        "description": "20 тысяч лет назад Земля была холодным и неуютным местом, в котором смерть подстерегала человека на каждом шагу.",
        "duration": 96,
        "origin": "Франция",
    },
    {
        "id": 3,
        "title": "Хищник",
        "description": "Самые опасные хищники Вселенной, прибыв из глубин космоса, высаживаются на улицах маленького городка, чтобы начать свою кровавую охоту. Генетически модернизировав себя с помощью ДНК других видов, охотники стали ещё сильнее, умнее и беспощаднее.",
        "duration": 101,
        "origin": "Канада, США",
    }
]

export const ContextProvider = ({children}) => {
    const [currentUser, setCurrentUser] = useState({
        name: 'Andrey Efimenko',
        email: 'aa.efimenko@yandex.ru'
    });
    const [userToken, setUserToken] = useState('');

    const [movies, setMovies] = useState(tmpMovies);

    return (
        <StateContext.Provider value={{
            currentUser,
            setCurrentUser,
            userToken,
            setUserToken,
            movies
        }}>
            {children}
        </StateContext.Provider>
    )
};

export const useStateContext = () => useContext(StateContext);
