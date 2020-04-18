<?php

return [
    'oracle' => [
        'driver'         => 'oracle',
        'tns'            => env('ORACLE_DB_TNS', ''),
        'host'           => env('ORACLE_DB_HOST', 'localhost'),
        'port'           => env('ORACLE_DB_PORT', '1521'),
        'database'       => env('ORACLE_DB_DATABASE', 'Oracle_cmru'),
        'username'       => env('ORACLE_DB_USERNAME', 'SYSTEM'),
        'password'       => env('ORACLE_DB_PASSWORD', 'password'),
        'charset'        => env('ORACLE_DB_CHARSET', 'AL32UTF8'),
        'prefix'         => env('ORACLE_DB_PREFIX', ''),
        'prefix_schema'  => env('ORACLE_DB_SCHEMA_PREFIX', 'SYSTEM'),
        'edition'        => env('ORACLE_DB_EDITION', 'ora$base'),
        'server_version' => env('ORACLE_DB_SERVER_VERSION', '11g'),
    ],
];
