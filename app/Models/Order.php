<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    // Specify the table name (optional if it follows Laravel naming conventions)
    protected $table = 'orders';

    // Specify the attributes that are mass assignable
    protected $fillable = ['total'];

    // Set primary key column if it's different from the default 'id'
    protected $primaryKey = 'id';

    // Indicate that the primary key is auto-incrementing (default behavior in Laravel)
    public $incrementing = true;

    // Indicate that the ID is an integer (default behavior in Laravel)
    protected $keyType = 'int';

    // Disable timestamps if not needed
    public $timestamps = false;
    public function orderProducts()
    {
        return $this->hasMany(OrderProduct::class);
    }
}
