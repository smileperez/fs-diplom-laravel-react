<?php

namespace App\Http\Controllers;

use App\Models\Sessions;
use App\Http\Resources\SessionsResource;
use App\Http\Requests\SessionsStoreRequest;

class SessionController extends Controller
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
    public function store(SessionsStoreRequest $request)
    {
        $data = $request->validated();

        $session = Sessions::create($data);

        return new SessionsResource($session);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
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
