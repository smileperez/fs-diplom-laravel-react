<?php

namespace App\Http\Controllers;

use App\Models\Seats;
use App\Models\Tickets;
use App\Http\Resources\TicketsResource;
use App\Http\Requests\TicketsStoreRequest;

class TicketsController extends Controller
{
    public function store(TicketsStoreRequest $request)
    {
        $data = $request->validated();

        $tickets = Tickets::create($data);

        return new TicketsResource($tickets);
    }

    /**
     * Показать все сессии относящиеся к конкретному UUID
     */
    public function showTicketsBySession($uuid)
    {
        $data = Tickets::where('uuid', $uuid)->get()->toArray();
        return $data;
    }

    /**
     * Показать все билеты относящиеся к конкретному session_id
     */
    public function showSeatsBySession($session_id, $date)
    {
        $data = Tickets::where('date', $date)->where('sessions_id', $session_id)->get()->toArray();
        return $data;
    }

    public function indexDefaultSeats()
    {
        $data = Tickets::pluck('seats_id');
        $defaultSeats = [];
        foreach ($data as $seat) {
            $default = Seats::where('id', $seat)->where('types_id', 1)->get()->toArray();
            if (!empty($default)) {
                array_push($defaultSeats, $default);
            }
        }
        return $defaultSeats;
    }

    public function indexVIPtSeats()
    {
        $data = Tickets::pluck('seats_id');
        $VIPSeats = [];
        foreach ($data as $seat) {
            $vip = Seats::where('id', $seat)->where('types_id', 2)->get()->toArray();
            if (!empty($vip)) {
                array_push($VIPSeats, $vip);
            }
        }
        return $VIPSeats;
    }
}
