<?php

namespace App\Http\Controllers;

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
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTypesRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Types $types)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTypesRequest $request, Types $types)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Types $types)
    {
        //
    }
}
