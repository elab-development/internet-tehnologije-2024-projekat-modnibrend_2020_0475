<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

class BlogPostFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array
     */
    public function definition()
    {
        return [
            'naslov' => $this->faker->sentence,
            'sadrzaj' => $this->faker->paragraph,
            'autor' => $this->faker->name,
            'datum_objave' => $this->faker->dateTimeThisYear,
            'kategorija' => $this->faker->word,
        ];
    }
}
