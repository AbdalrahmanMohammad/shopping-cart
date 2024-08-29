<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    protected $table = 'products';

    protected $fillable = ['name', 'price'];

    public $timestamps = false; // Disable timestamps

    protected $primaryKey = 'name'; // Set 'name' as the primary key

    public $incrementing = false; // Primary key is not auto-incrementing
}
