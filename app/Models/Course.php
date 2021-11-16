<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    protected $fillable = [
        "name",
        "type",
        "city",
        "start",
        "end",
        "typology",
        "predominant",
        "image",
        "avslope",
        "pgw",
        "restzone",
        "filepdf",
        "description",
    ];
}
