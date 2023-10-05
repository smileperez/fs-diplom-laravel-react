import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {},
    prices: [],
    seat_types: [],
    calendar: [],
});

const tmpSeats = [
    {
        id: 1,
        name: 'Обычный 1',
        rows: 7,
        seats: 12,
    },
    {
        id: 2,
        name: 'Обычный 2',
        rows: 10,
        seats: 10,
    },
    {
        id: 3,
        name: 'Black',
        rows: 4,
        seats: 4,
    },
];

const tmpPrices = [
    {
        id: 1,
        hall_id: 1,
        seatsType_id: 1,
        price: 300,
    },
    {
        id: 2,
        hall_id: 1,
        seatsType_id: 2,
        price: 400,
    },
    {
        id: 3,
        hall_id: 2,
        seatsType_id: 1,
        price: 250,
    },
    {
        id: 4,
        hall_id: 2,
        seatsType_id: 2,
        price: 350,
    },
];

const tmpSeatsType = [
    {
        id: 1,
        type: 'Обычный',
    },
    {
        id: 2,
        type: 'VIP',
    },
];

const tmpCalendar = [
    {
        name_of_day: "Пн",
        day: "02",
        weekend: "false",
    },
    {
        name_of_day: "Вт",
        day: "03",
        weekend: "false",
    },
    {
        name_of_day: "Ср",
        day: "04",
        weekend: "false",
    },
    {
        name_of_day: "Чт",
        day: "05",
        weekend: "false",
    },
    {
        name_of_day: "Пт",
        day: "06",
        weekend: "false",
    },
    {
        name_of_day: "Сб",
        day: "07",
        weekend: "true",
    },
    {
        name_of_day: "Вс",
        day: "08",
        weekend: "true",
    },
];

export const ContextProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState({});
    const [userToken, _setUserToken] = useState(
        localStorage.getItem("TOKEN") || ""
    );
    const [prices, setPrices] = useState(tmpPrices);
    const [seat_types, setSeat_types] = useState(tmpSeatsType);
    const [calendar, setCalendar] = useState(tmpCalendar);

    const setUserToken = (token) => {
        if (token) {
            localStorage.setItem("TOKEN", token);
        } else {
            localStorage.removeItem("TOKEN");
        }
        _setUserToken(token);
    };

    return (
        <StateContext.Provider
            value={{
                currentUser,
                setCurrentUser,
                userToken,
                setUserToken,
                prices,
                seat_types,
                calendar,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

export const useStateContext = () => useContext(StateContext);
