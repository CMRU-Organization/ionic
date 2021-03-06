<?php

Route::post('login', 'AuthController@login')->name('auth.login');
Route::get('checkprofile_none_authen', 'AuthController@checkprofile_none_authen')->name('auth.checkprofile_none_authen');

Route::group(['middleware' => 'auth:api'], function() {
    Route::get('profile', 'AuthController@profile')->name('auth.profile');
    Route::get('logout','AuthController@logout')->name('auth.logout');
    Route::resource('users', 'UserController')->except(['edit', 'create']);

    Route::get('checkprofile', 'AuthController@checkprofile')->name('auth.checkprofile');
    Route::get('mygrade', 'AuthController@mygrade')->name('auth.mygrade');

    Route::get('classSchedule', 'AuthController@classSchedule')->name('auth.classSchedule');
    Route::get('examSchedule', 'AuthController@examSchedule')->name('auth.examSchedule');

});
