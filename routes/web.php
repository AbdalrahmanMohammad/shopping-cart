<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\OrderController;



/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});



Route::post('/getproducts', [ProductController::class, 'getProducts']);
Route::post('/addproduct', [ProductController::class, 'addProduct']);
Route::post('/deleteproduct', [ProductController::class, 'deleteProduct']);


Route::post('/addorder', [OrderController::class, 'store']); // Route to store an order
Route::post('/orders', [OrderController::class, 'index']); // Route to get all orders

