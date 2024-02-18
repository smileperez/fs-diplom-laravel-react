<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Prices;
use App\Http\Requests\PricesStoreRequest;

class PricesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PricesStoreRequest $request)
    {
        $data = $request->all();

        // Получаем массив с ценами и разбираем его
        if (is_array($data)) {
            foreach ($data as $item) {
                $seat = Prices::create($item);
            }
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $hall_id)
    {
        $data = Prices::where('halls_id', $hall_id)->get()->toArray();
        return $data;
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
