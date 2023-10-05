<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SeatTypes extends Model
{
    use HasFactory;

    protected $fillable = ['type', 'created_at', 'updated_at'];
}
