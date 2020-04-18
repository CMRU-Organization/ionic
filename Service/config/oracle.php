<?php

return [
    'oracle' => [
        'driver'         => 'oracle',
        'tns'            => env('DB_TNS', ''),
        'host'           => env('DB_HOST', 'localhost'),
        'port'           => env('DB_PORT', '1521'),
        'database'       => env('DB_DATABASE', 'Oracle_cmru'),
        'username'       => env('DB_USERNAME', 'SYSTEM'),
        'password'       => env('DB_PASSWORD', 'password'),
        'charset'        => env('DB_CHARSET', 'AL32UTF8'),
        'prefix'         => env('DB_PREFIX', ''),
        'prefix_schema'  => env('DB_SCHEMA_PREFIX', 'SYSTEM'),
        'edition'        => env('DB_EDITION', 'ora$base'),
        'server_version' => env('DB_SERVER_VERSION', '11g'),
    ],
];
