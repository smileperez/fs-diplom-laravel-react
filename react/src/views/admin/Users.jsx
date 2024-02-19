import PageComponent from "../../components/admin/PageComponent";
import SlidePopupComponent from "../../components/core/SlidePopupComponent";
import EButton from "../../components/core/EButton";
import { PlusCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";
import axiosClient from "../../axios.js";
import PaginationComponent from "../../components/admin/PaginationComponent";
import UserItem from "../../components/admin/UserItem.jsx";

export default function Users() {

    // Состояние для загрузки из БД общего списка пользователей
    const [users, setUsers] = useState([]);

    // Состояния для открытия/закрытия в SlidePopupComponent
    const [open, setOpen] = useState(false);

    // Состояние для хранения ошибки
    const [error, setError] = useState("");

    // Состояния для добавления нового пользователя
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        password_confirmation: "",
    });

    // Соятоние загрузки данных из БД
    const [loading, setLoading] = useState(false);

    // Соятоние для meta, полученной с ответом на запрос данных из БД (для pagination)
    const [meta, setMeta] = useState({});

    // Функция получения актуальных URL для пагинации из БД (для компонента PaginationComponent)
    const getUsers = (url) => {
        url = url || "/users";
        setLoading(true);
        axiosClient.get(url).then(({ data }) => {
            setUsers(data.data);
            setMeta(data.meta);
            setLoading(false);
        });
    };

    // При каждом обновлении страницы обновляем URL страниц пагинации (для компонента PaginationComponent)
    useEffect(() => {
        getUsers();
    }, []);

    // Callback для пагинации (компонент PaginationComponent)
    const onPageClick = (link) => {
        getUsers(link.url);
    };

    // Отправка request в БД с новым залом
    const onSubmit = (event) => {
        event.preventDefault();

        console.log('Тык');

        const payload = { ...user };
        console.log(payload);

        axiosClient
            .post("/users", payload)
            .then((response) => {
                console.log(response);
                // Закрываем slider-popup
                setOpen(false);
                // Перезагружаем страницу
                getUsers();
            })
            .catch((err) => {
                if (err && err.response) {
                    // Записываем error в состояние
                    setError(err.response.data.message);
                }
                console.log(err, err.response);
            });
    };

    return (
        <PageComponent title="Управление администраторами" button={
            <EButton color="regular" onClick={() => setOpen(true)}>
                <PlusCircleIcon className="h-6 w-6" />
                <div className="hidden md:ml-2 md:block">Добавить пользователя</div>
            </EButton>
        }>
            {loading && (
                <div className="text-center text-lg">Загрузка данных...</div>
            )}

            {!loading && (
                <div>
                    {users.slice(0).reverse().map((user) => (
                        <UserItem
                            user={user}
                            getUsers={getUsers}
                            key={user.id}
                        />
                    ))}
                    <PaginationComponent
                        meta={meta}
                        onPageClick={onPageClick}
                    />
                </div>
            )}

            {/* Slide-Popup для добавления нового зала */}
            <SlidePopupComponent
                open={open}
                setOpen={setOpen}
                title="Добавление нового пользователя"
            >
                {error && (
                    <div className="bg-red-500 text-white text-sm py-2 px-2 mb-1 rounded">
                        {error}
                    </div>
                )}

                <form onSubmit={onSubmit} action="#" method="POST">
                    {/* Имя пользователя */}
                    <div>
                        <label
                            htmlFor="name"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Имя пользователя: {" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">

                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={user.name}
                                onChange={(event) =>
                                    setUser({
                                        ...user,
                                        name: event.target.value,
                                    })
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#89639e] sm:text-sm sm:leading-6"
                                placeholder="Имя"
                            />
                        </div>
                    </div>
                    {/* Имя пользователя */}

                    {/* Email пользователя */}
                    <div className="mt-2">
                        <label
                            htmlFor="email"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Email:{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">

                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={user.email}
                                onChange={(event) =>
                                    setUser({
                                        ...user,
                                        email: event.target.value,
                                    })
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#89639e] sm:text-sm sm:leading-6"
                                placeholder="E-mail"
                            />

                        </div>
                    </div>
                    {/* Email пользователя */}

                    {/* Пароль */}
                    <div className="mt-2">
                        <label
                            htmlFor="password"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Пароль:{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">

                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={user.password}
                                onChange={(event) =>
                                    setUser({
                                        ...user,
                                        password: event.target.value,
                                    })
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#89639e] sm:text-sm sm:leading-6"
                                placeholder="Пароль"
                            />
                        </div>
                    </div>
                    {/* Пароль */}

                    {/* Повтор пароля */}
                    <div className="mt-2">
                        <label
                            htmlFor="password-confirmation"
                            className="block text-sm font-medium leading-6 text-gray-900"
                        >
                            Повтор пароля:{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <div className="mt-2">

                            <input
                                id="password-confirmation"
                                name="password_confirmation"
                                type="password"
                                required
                                value={user.password_confirmation}
                                onChange={(event) =>
                                    setUser({
                                        ...user,
                                        password_confirmation: event.target.value,
                                    })
                                }
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-[#89639e] sm:text-sm sm:leading-6"
                                placeholder="Повтор пароля"
                            />
                        </div>
                    </div>
                    {/* Повтор пароля */}



                    <div className="flex justify-between pt-4 mt-4 border-t border-gray-200">
                        <EButton submit>
                            <PlusCircleIcon className="h-6 w-6 mr-2" />
                            Добавить
                        </EButton>

                        <EButton color="gray" onClick={() => setOpen(false)}>
                            <XCircleIcon className="h-6 w-6 mr-2" />
                            Отменить
                        </EButton>
                    </div>
                </form>
            </SlidePopupComponent>
        </PageComponent>
    )
}
