<?php

namespace App\Http\Controllers;

use App\Http\Resources\MoviesResource;
use App\Models\Movies;

use App\Http\Requests\StoreMoviesRequest;
use App\Http\Requests\UpdateMoviesRequest;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\File;

// TODO: Остановился на 3:30 ролика.
// Не завершен контролер, роутер и т.д.

class MoviesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return MoviesResource::collection(
            Movies::orderBy('id', 'desc')->paginate(2)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMoviesRequest $request)
    {
        $data = $request->validated();

        // Проверяем:
        // - если была получена картинка, 
        // - то сохраняем ее локально в /public и в БД пишем корректную ссылку
        if (isset($data['img'])) {
            $relativePath = $this->saveImage($data['img']);
            $data['img'] = $relativePath;
        }

        $movie = Movies::create($data);

        return new MoviesResource($movie);
    }

    /**
     * Display the specified resource.
     */
    public function show(Movies $movie)
    {
        return new MoviesResource($movie);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMoviesRequest $request, Movies $movie)
    {
        $data = $request->validated();

        if (isset($data['img'])) {
            $relativePath = $this->saveImage($data['img']);
            $data['img'] = $relativePath;

            // Если существует ранее загруженная картинка, удаляем её
            if ($movie->img) {
                $absolutePath = public_path($movie->img);
                File::delete($absolutePath);
            }
        }

        // Обновляем данные фильма в базе-данных
        $movie->update($data);

        return new MoviesResource($movie);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movies $movie)
    {
        $movie->delete();

        // Если есть старая картинка, тоже удаляем её
        if ($movie->img) {
            $absolutePath = public_path($movie->img);
            File::delete($absolutePath);
        }

        return response('', 204);
    }

    // Функция сохранения картинки в локальное хранилище и возвращение пути до картинки
    private function saveImage($image)
    {
        // Проверяем, если каринка валидна base64 строке
        if (preg_match('/^data:image\/(\w+);base64,/', $image, $type)) {
            // Получение декодированого чистого Base64 текста
            $image = substr($image, strpos($image, ',') + 1);
            // Получение типа расширения
            $type = strtolower($type[1]); // jpg, png, gif
            // Проверка файла на поддерживаемые расширения картинок
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('Неверный тип изображения.');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('Ошибка декодирования Base64.');
            }

        } else {
            throw new \Exception('URI данных не соответствует данным изображения.');
        }

        $dir = 'images/';
        $file = Str::random() . '.' . $type;
        $absolutePath = public_path($dir);
        $relativePath = $dir . $file;
        if (!File::exists($absolutePath)) {
            File::makeDirectory($absolutePath, 0755, true);
        }
        file_put_contents($relativePath, $image);

        return $relativePath;
    }
}