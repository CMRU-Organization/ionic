<?php

Route::post('login', 'AuthController@login')->name('auth.login');

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('profile', 'AuthController@profile')->name('auth.profile');
    Route::get('logout','AuthController@logout')->name('auth.logout');
    Route::resource('users', 'UserController')->except(['edit', 'create']);
});
