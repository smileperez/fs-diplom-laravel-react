<?php

namespace App\Http\Controllers;

use App\Http\Resources\TypesResource;
use App\Models\Types;
use App\Http\Requests\StoreTypesRequest;
use App\Http\Requests\UpdateTypesRequest;

class TypesController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return TypesResource::collection(
            Types::orderBy('id', 'desc')->paginate(2)
        );
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTypesRequest $request)
    {
        $data = $request->validated();

        $types = Types::create($data);

        return new TypesResource($types);
    }

    /**
     * Display the specified resource.
     */
    public function show(Types $types)
    {
        return new TypesResource($types);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTypesRequest $request, Types $types)
    {
        $data = $request->validated();

        $types->update($data);

        return new TypesResource($types);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Types $types)
    {
        $types-delete();
        return response('', 204);
    }
}
