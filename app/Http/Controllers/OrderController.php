<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderProduct;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Store a new order with associated products.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'total' => 'required|numeric', // Ensuring 'total' is required and must be numeric
            'products' => 'required|array', // Products must be an array
            'products.*.productname' => 'required|string', // Each product must have a name
            'products.*.quantity' => 'required|integer|min:1', // Each product must have a quantity of at least 1
            'products.*.price' => 'required|numeric|min:0', // Each product must have a valid price
        ]);

        // Use a transaction to ensure data integrity
        DB::beginTransaction();

        try {
            // Create a new order in the database
            $order = Order::create([
                'total' => $validated['total'],
            ]);

            // Create order-products entries
            foreach ($validated['products'] as $product) {
                OrderProduct::create([
                    'order_id' => $order->id, // Associate each product with the newly created order
                    'productname' => $product['productname'],
                    'quantity' => $product['quantity'],
                    'price' => $product['price'],
                ]);
            }

            // Commit the transaction
            DB::commit();

            // Return a JSON response indicating success
            return response()->json([
                'message' => 'Order and products created successfully',
                'order' => $order,
                'products' => $order->orderProducts, // Return associated products
            ], 201);
        } catch (\Exception $e) {
            // Rollback the transaction in case of an error
            DB::rollBack();
            return response()->json([
                'error' => 'Failed to create order',
                'details' => $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all orders.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index()
    {
        // Retrieve all orders with their associated products from the database
        $orders = Order::with('orderProducts')->get();

        // Return the orders as a JSON response
        return response()->json($orders);
    }
}
