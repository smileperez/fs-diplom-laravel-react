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
        $sessions = Sessions::all();

        return $sessions;
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
    public function show($hall_id)
    {
        $data = Sessions::where('halls_id', $hall_id)->get()->toArray();
        return $data;
    }

    /**
     * Display the specified resource.
     */
    public function showGuest($movie_id)
    {
        $data = Sessions::where('movies_id', $movie_id)->get()->toArray();
        return $data;
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
    public function destroy(Sessions $session)
    {
        $session->delete();
        return response('', 204);
    }
}
