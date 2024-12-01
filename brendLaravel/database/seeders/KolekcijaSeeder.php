<?php

namespace Database\Seeders;

use App\Models\Kolekcija;
use Illuminate\Database\Seeder;

class KolekcijaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Kolekcija::factory()->count(5)->create();
    }
}
