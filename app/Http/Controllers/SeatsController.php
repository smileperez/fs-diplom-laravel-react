<?php

namespace App\Http\Controllers;

use App\Http\Requests\SeatsUpdateRequest;
use App\Http\Resources\SeatsResource;
use App\Models\Seats;
use Illuminate\Http\Request;

class SeatsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SeatsResource::collection(
            Seats::orderBy('id', 'desc')
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $data = $request->validated();

        $seat = Seats::create($data);

        return new SeatsResource($seat);
    }

    /**
     * Display the specified resource.
     */
    public function show(Seats $seat)
    {
        return new SeatsResource($seat);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(SeatsUpdateRequest $request, Seats $seat)
    {
        $data = $request->validated();

        $seat->update($data);

        return new SeatsResource($seat);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Seats $seat)
    {
        $seat->delete();
        return response('', 204);
    }
}