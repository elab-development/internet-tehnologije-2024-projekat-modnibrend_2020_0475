<?php

namespace Database\Seeders;

use App\Models\Proizvod;
use Illuminate\Database\Seeder;

class ProizvodSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Proizvod::factory()->count(10)->create();
    }
}
