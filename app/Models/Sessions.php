<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Sessions extends Model
{
    use HasFactory;

    protected $fillable = ['movies_id', 'halls_id', 'sessionTime', 'created_at', 'updated_at'];
}
