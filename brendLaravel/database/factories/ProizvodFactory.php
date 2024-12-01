<?php

namespace Database\Factories;

use App\Models\Kolekcija;
use Illuminate\Database\Eloquent\Factories\Factory;

class ProizvodFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'naziv' => $this->faker->word,
            'opis' => $this->faker->sentence,
            'cena' => $this->faker->randomFloat(2, 10, 1000),
            'kolekcija_id' => Kolekcija::factory(),
            'slika' => $this->faker->imageUrl(640, 480, 'product'),
            'dostupan' => $this->faker->boolean,
        ];
    }
}
