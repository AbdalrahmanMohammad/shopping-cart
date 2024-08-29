<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function getProducts()
    {
        // Fetch all products from the database
        $products = Product::all();

        // Return the products as a JSON response
        return response()->json($products);
    }

    public function addProduct(Request $request)
    {
        // Validate the incoming request data
        $validatedData = $request->validate([
            'name' => 'required|string|max:255|unique:products,name', // Ensure 'name' is unique
            'price' => 'required|numeric|min:0',
        ]);

        // Create a new product with the validated data
        $product = Product::create($validatedData);

        // Return the created product as a JSON response
        return response()->json($product, 201);
    }

    public function deleteProduct(Request $request)
    {
        // Validate the incoming request data
        $validated = $request->validate([
            'name' => 'required|string|exists:products,name', // Ensure 'name' exists in products table
        ]);

        // Find and delete the product by name
        $product = Product::where('name', $validated['name'])->first();

        // Delete the product and return a response
        $product->delete();

        return response()->json(['message' => 'Product deleted successfully'], 200);
    }
}
