<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Proizvod extends Model
{
    use HasFactory;

    protected $fillable = [
        'naziv',
        'opis',
        'cena',
        'kolekcija_id',
        'slika',
        'dostupan',
    ];

    public function kolekcija()
    {
        return $this->belongsTo(Kolekcija::class);
    }
}
