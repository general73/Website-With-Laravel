<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| This file is where you may define all of the routes that are handled
| by your application. Just tell Laravel the URIs it should respond
| to using a Closure or controller method. Build something great!
|
*/

Route::get('/', 'HomeController@index');
Route::post('/', 'HomeController@index2');

Route::get('aboutUs', 'AboutUsController@index');

Route::get('gallery', 'GalleryController@index');
Route::get('gallery/{id}', 'GalleryController@showGallery');

Route::get('contactUs', 'ContactUsController@index');
Route::post('contactUs', 'ContactUsController@sendEmail');
///contactUs/agent
Route::get('contactUs/agent', 'ContactUsController@agent');

Route::get('products', 'productsController@index');
Route::post('products/{id}', 'productsController@registerProduct');
Route::get('products/{id}', 'productsController@showProduct');
//Route::get('contactUs', function (){ return view('contactUs'); });

Route::get('welcome', function () {
    return view('welcome');
});
Route::get('email', function () {
    return view('emails.email2');
});
//Route::post('content', array('as' => 'content', 'uses' => 'HomeController@content'));