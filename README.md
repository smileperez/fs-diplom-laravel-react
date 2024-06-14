# Веб-приложение управления кинотеатром

<p align="center"><img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/logo.png" width="100%" alt="Laravel Logo"></p>

<p align="center">
<img src="https://badgen.net/badge/PHP/8.2.12?color=purple" alt="PHP Version">
<img src="https://badgen.net/badge/Laravel/10.23.1?color=red" alt="Laravel Version">
<img src="https://badgen.net/badge/Node.js/8.2.12?color=green" alt="NODE Version">
<img src="https://badgen.net/badge/NPM/10.1.0?color=orange" alt="NPM Version">
<img src="https://badgen.net/badge/React/18.2?color=cyan" alt="React Version">
<img src="https://badgen.net/badge/App%20Version/1.0?color=grey" alt="App Version">
</p>

## О проекте
Проект представляет собой сайт для онлайн бронирования билетов в кинотеатр и административный интерфейс системы для конфигурирования залов, сеансов и предварительного бронирования билетов.

## Превью проекта

*Клиентская часть*

<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/main_page.png" alt="Main page">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/select_seats_page.png" alt="Select seats page">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/reserve_page.png" alt="Reserve page">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/ticket_page.png" alt="Ticket page">

*Административная часть*

<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/dashboard_page_2.png" alt="Dashboard page">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/dashboard_page_1.png" alt="Dashboard page">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/halls_page_1.png" alt="Halls page 1">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/halls_page_2.png" alt="Halls page 2">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/config_page.png" alt="Config page">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/prices_page_1.png" alt="Prices page 1">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/prices_page_2.png" alt="Prices page 2">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/movies_page_1.png" alt="Ticket page 1">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/movies_page_2.png" alt="Ticket page 2">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/sessions_page_1.png" alt="Ticket page 1">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/sessions_page_2.png" alt="Ticket page 2">
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/users_page.png" alt="Users page">

## Ключевые заметки по работе приложения

- Использование **Laravel Framework**
- Использование **Vite** с уклоном в **React**
- Стандартный порт **Vite** был изменен на **`:3000`**
- Использование пакета стилей **`Tailwind.css`**
- Использование плагина **`@tailwindcss/forms`**
- Использование пакет иконок **`Heroicons`**
- Использование пакета стилей **`Headless UI`**
- Использование пакета **`react-router-dom`** в качестве основного роутера приложения
- Использование пакета **`axios`** для создания и обработки запросов в сторону API Laravel

## Документация

*1. Запуск приложения Laravel:*
| **№** | **Действие** | **Подробности** |
|:- |:----------------|:--------------|
| 1.1 | В корневой папке приложения запускаем команду | `composer install` |
| 1.2 | В корневой папке проекта файл `.env.example` переименовываем в `.env`. | Проверяем файл в корневой папке проекта `.env` на корректность, например что адрес, название БД, логин и пароль стоят корректные. | |
| 1.4 | Создаем новую БД с кодировкой utf8mb4_unicode_ci | Проверяем, что название новой БД сходится с названием в файле `.env` |
| 1.5 | Выполняем первую миграцию с сидированием БД | `php artisan migrate:fresh --seed` |
| 1.6 | В корневой папке приложения запускаем команду | `php artisan key:generate` |
| 1.7 | Проверяем, что Laravel запустился корректно | `php artisan serve` |

*2. Запуск приложения VITE/React:*

| **№** | **Действие** | **Подробности** |
|:- |:----------------|:--------------|
| 2.1 | Проходим в папку `/react` и запускаем команду  | `npm install` |
| 2.2 | В корне папки `/react` создаём новый файл конфиг с именем `.env` и записываем туда константу | `VITE_API_BASE_URL=http://localhost:8000` |
| 2.3 | Проверяем, что Vite запустился корректно | `npm run dev` |

*3. Схема базы данных:*
<img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/schema-fs-app.png" width="100%" alt="DB Schema">

## Используемые NPM пакеты

-  @headlessui/react@1.7.17</br>
-  @heroicons/react@2.0.18</br>
-  @tailwindcss/forms@0.5.6</br>
-  @types/react-dom@18.2.7</br>
-  @types/react@18.2.21</br>
-  @vitejs/plugin-react@4.0.4</br>
-  autoprefixer@10.4.15</br>
-  axios@1.5.0</br>
-  eslint-plugin-react-hooks@4.6.0</br>
-  eslint-plugin-react-refresh@0.4.3</br>
-  eslint-plugin-react@7.33.2</br>
-  eslint@8.49.0</br>
-  postcss@8.4.29</br>
-  react-dom@18.2.0</br>
-  react-router-dom@6.16.0</br>
-  react@18.2.0</br>
-  tailwindcss@3.3.3</br>
-  vite@4.4.9</br>




