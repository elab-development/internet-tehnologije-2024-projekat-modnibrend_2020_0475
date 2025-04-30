<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kolekcija extends Model
{
    use HasFactory;

    protected $fillable = [
        'naziv',
        'opis',
        'datum_objave',
        'slika',
    ];

    public function proizvodi()
    {
        return $this->hasMany(Proizvod::class);
    }
}
