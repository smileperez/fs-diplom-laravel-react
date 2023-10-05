<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreSeatTypesRequest;
use App\Http\Requests\UpdateSeatTypesRequest;
use App\Http\Resources\SeatTypesResource;
use App\Models\SeatTypes;

class SeatTypesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return SeatTypesResource::collection(
            SeatTypes::orderBy('id', 'desc')->paginate(2)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSeatTypesRequest $request)
    {
        $data = $request->validated();

        $seatTypes = SeatTypes::create($data);

        return new SeatTypesResource($seatTypes);
    }

    /**
     * Display the specified resource.
     */
    public function show(SeatTypes $seatTypes)
    {
        return new SeatTypesResource($seatTypes);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSeatTypesRequest $request, SeatTypes $seatTypes)
    {
        $data = $request->validated();

        $seatTypes->update($data);

        return new SeatTypesResource($seatTypes);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(SeatTypes $seatTypes)
    {
        $seatTypes->delete();
        return response('', 204);
    }
}
