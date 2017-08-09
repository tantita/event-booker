<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('auth/login', 'AuthApiController@login');
Route::post('auth/signup', 'AuthApiController@signup');

Route::get('events', 'EventsApiController@index');
Route::get('events/{id}', 'EventsApiController@getEventStands');

Route::get('stand/{id}', 'EventsApiController@getStand');

Route::post('uploads', 'EventsApiController@uploadFile');


Route::post('booking', 'EventsApiController@createBooking');
// Route::post('visit', '');


