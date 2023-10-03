import { useContext } from "react";
import { useState } from "react";
import { createContext } from "react";

const StateContext = createContext({
    currentUser: {},
    userToken: null,
    setCurrentUser: () => {},
    setUserToken: () => {},
    movies: [],
    halls: [],
    prices: [],
    seat_types: [],
    calendar: [],
});

const tmpMovies = [
    {
        id: 1,
        title: "Звёздные войны: Эпизод 3 — Месть ситхов",
        img_url: "../images/sw3-poster.jpeg",
        description:
            "Идёт третий год Войн клонов. Галактическая Республика, некогда бывшая спокойным и гармоничным государством, превратилась в поле битвы между армиями клонов, возглавляемых канцлером Палпатином, и армадами дроидов, которых ведёт граф Дуку, тёмный лорд ситхов. Республика медленно погружается во тьму. Лишь рыцари-джедаи, защитники мира и справедливости, могут противостоять злу, которое вскоре поглотит галактику. Но настоящая битва идёт в душе у молодого рыцаря-джедая Энакина, который разрывается между долгом джедая и любовью к своей жене, сенатору Падме Амидале. И от того, какое чувство в нём победит, зависит будущее всего мира.",
        duration: 140,
        origin: "США, Италия, Швейцария, Таиланд",
    },
    {
        id: 2,
        title: "Стартрек: Бесконечность",
        img_url: "../images/st-poster.jpg",
        description:
            "Бесстрашная команда крейсера звездного флота «Энтерпрайз» исследует неизведанные глубины космоса. Во время этого полного опасностей путешествия герои сталкиваются с таинственной силой, ставящей под угрозу не только их миссию и стабильность Федерации, но и весь миропорядок.",
        duration: 122,
        origin: "США, Китай, ОАЭ, Канада",
    },
    {
        id: 3,
        title: "Интерстеллар ",
        img_url: "../images/interstellar.jpg",
        description:
            "Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину (которая предположительно соединяет области пространства-времени через большое расстояние) в путешествие, чтобы превзойти прежние ограничения для космических путешествий человека и найти планету с подходящими для человечества условиями.",
        duration: 169,
        origin: "США, Великобритания, Канада",
    },
    {
        id: 4,
        title: "Интерстеллар ",
        img_url: "../images/interstellar.jpg",
        description:
            "Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину (которая предположительно соединяет области пространства-времени через большое расстояние) в путешествие, чтобы превзойти прежние ограничения для космических путешествий человека и найти планету с подходящими для человечества условиями.",
        duration: 169,
        origin: "США, Великобритания, Канада",
    },
    {
        id: 5,
        title: "Интерстеллар ",
        img_url: "../images/interstellar.jpg",
        description:
            "Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину (которая предположительно соединяет области пространства-времени через большое расстояние) в путешествие, чтобы превзойти прежние ограничения для космических путешествий человека и найти планету с подходящими для человечества условиями.",
        duration: 169,
        origin: "США, Великобритания, Канада",
    },
];

const tmpHalls = [
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
    const [movies, setMovies] = useState(tmpMovies);
    const [halls, setHalls] = useState(tmpHalls);
    const [prices, setPrices] = useState(tmpCalendar);
    const [seat_types, setSeat_types] = useState(tmpCalendar);
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
                movies,
                halls,
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
