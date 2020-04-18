<?php

/** @var Factory $factory */

use App\User;
use Illuminate\Support\Str;
use Faker\Generator as Faker;
use Illuminate\Database\Eloquent\Factory;

$factory->define(User::class, function (Faker $faker) {
    return [
        'userid' => $faker->name,
        'studentcode' => $faker->unique()->uuid,
        'prefixname' => $faker->unique()->titleFemale,
        'studentname' => $faker->unique()->firstName,
        'studentsurname' => $faker->unique()->lastName,
        'user_verified_at' => now(),
        'password' => bcrypt('password'),
        'remember_token' => Str::random(10),
    ];
});
