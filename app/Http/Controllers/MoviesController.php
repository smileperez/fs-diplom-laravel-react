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
            Movies::orderBy('id', 'desc')->paginate(10)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreMoviesRequest $request)
    {
        $data = $request->validated();

        // Проверяем, если была получена картинка, то сохраняем ее локально
        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;
        }

        $movie = Movies::create($data);

        return new MoviesResource($movie);
    }

    /**
     * Display the specified resource.
     */
    public function show(Movies $movies)
    {
        return new MoviesResource($movies);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateMoviesRequest $request, Movies $movies)
    {
        $data = $request->validated();

        if (isset($data['image'])) {
            $relativePath = $this->saveImage($data['image']);
            $data['image'] = $relativePath;

            // Если существует ранее загруженная картинка, удаляем её
            if ($movies->image) {
                $absolutePath = public_path($movies->image);
                File::delete($absolutePath);
            }
        }

        // Обновляем данные фильма в базе-данных
        $movies->update($data);

        return new MoviesResource($movies);
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Movies $movies)
    {
        $movies->delete();

        // Если есть старая картинка, тоже удаляем её
        if ($movies->image) {
            $absolutePath = public_path($movies->image);
            File::delete($absolutePath);
        }

        return response('', 204);
    }

    // Функция сохранения картинки в локальное хранилизе и возвращение пути до картинки
    private function saveImage($image)
    {
        // Проверяем, если каринка валидна base64 строке
        if (preg_match('/^data:image\/(\w+);Base64,/', $image, $type)) {
            // Получение декодированого чистого Base64 текста
            $image = substr($image, strpos($image, ',') + 1);
            // Получение типа расширения
            $type = strtolower($type[1]); // jpg, png, gif
            // Проверка файла на поддерживаемые расширения картинок
            if (!in_array($type, ['jpg', 'jpeg', 'gif', 'png'])) {
                throw new \Exception('MoviesController->saveImage->Invalid image type');
            }
            $image = str_replace(' ', '+', $image);
            $image = base64_decode($image);

            if ($image === false) {
                throw new \Exception('MoviesController->saveImage->Base64_decode failed');
            }

        } else {
            throw new \Exception('MoviesController->saveImage->Did not match data URI with image data');
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