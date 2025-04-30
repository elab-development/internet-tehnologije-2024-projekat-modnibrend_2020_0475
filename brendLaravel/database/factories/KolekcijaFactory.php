<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class KolekcijaFactory extends Factory
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
            'datum_objave' => $this->faker->date,
            'slika' => $this->faker->imageUrl(640, 480, 'fashion'),
        ];
    }
}
