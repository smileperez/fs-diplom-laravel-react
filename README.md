# Веб-приложение управления кинотеатром и бронирования сеансов

<p align="center"><img src="https://raw.githubusercontent.com/smileperez/fs-diplom-laravel-react/main/public/images/logo.png" width="400" alt="Laravel Logo"></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## Ключевые версии ПО
├── PHP Version - 8.2.12</br>
├── Laravel Framework Version - 10.23.1</br>
├── Node.js Version - 20.5.1</br>
├── NPM Version - 10.1.0</br>

## Используемые NPM пакеты

├── @headlessui/react@1.7.17</br>
├── @heroicons/react@2.0.18</br>
├── @tailwindcss/forms@0.5.6</br>
├── @types/react-dom@18.2.7</br>
├── @types/react@18.2.21</br>
├── @vitejs/plugin-react@4.0.4</br>
├── autoprefixer@10.4.15</br>
├── axios@1.5.0</br>
├── eslint-plugin-react-hooks@4.6.0</br>
├── eslint-plugin-react-refresh@0.4.3</br>
├── eslint-plugin-react@7.33.2</br>
├── eslint@8.49.0</br>
├── postcss@8.4.29</br>
├── react-dom@18.2.0</br>
├── react-router-dom@6.16.0</br>
├── react@18.2.0</br>
├── tailwindcss@3.3.3</br>
└── vite@4.4.9</br>

## Ключевые заметки по работе приложения

1. Использование **Laravel Framework**
2. Использование **Vite** с уклоном в **React**
3. Стандартный порт **Vite** был изменен на **`:3000`**
4. Использование пакета стилей **`Tailwind.css`**
5. Использование плагина **`@tailwindcss/forms`**
6. Использование пакет иконок **`Heroicons`**
7. Использование пакета стилей **`Headless UI`**
8. Использование пакета **`react-router-dom`** в качестве основного роутера приложения
9. Использование пакета **`axios`** для создания и обработки запросов в сторону API Laravel
10. Схема базы данных: https://dbdesigner.page.link/RMPhVxXs7sPxb4Q36


## Инструкция по запуску приложения

*1. Запуск приложения Laravel:*
| **№** | **Действие** | **Подробности** |
|:- |:----------------|:--------------|
| 1.1 | В корневой папке приложения запускаем команду | `composer install` |
| 1.2 | В корневой папке проекта файл `.env.example` переименовываем в `.env`. Если файла в папке нет, то необходимо скачать дефолтный файл из интернете (https://github.com/platformsh-templates/laravel/blob/master/.env.example). | Проверяем файл в корневой папке проекта `.env` на корректность, например что адрес, название БД, логин и пароль стоят корректные. | |
| 1.4 | Создаем новую БД с названием `fs-app` с кодировкой utf8mb4_unicode_ci | Проверяем, что название новой БД сходится с названием в файле `.env` |
| 1.5 | Выполняем первую миграцию с сидированием БД | `php artisan migrate:fresh --seed` |
| 1.6 | В корневой папке приложения запускаем команду | `php artisan key:generate` |
| 1.7 | Проверяем, что Laravel запустился корректно | `php artisan serve` |

*2. Запуск приложения VITE/React:*

| **№** | **Действие** | **Подробности** |
|:- |:----------------|:--------------|
| 2.1 | Проходим в папку `/react` и запускаем команду  | `npm install` |
| 2.2 | В корне папки `/react` создаём новый файл конфиг с именем `.env` и записываем туда константу | `VITE_API_BASE_URL=http://localhost:8000` |
| 2.3 | Проверяем, что Vite запустился корректно | `npm run dev` |
