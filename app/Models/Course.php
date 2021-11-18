<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        "courseName",
        "type",
        "city",
        "start",
        "end",
        "graus",
        "predominant",
        "routeImage",
        "avslope",
        "pgw",
        "restZones",
        "pdf",
        "distance",
        "turns",
        "description",
    ];
}
