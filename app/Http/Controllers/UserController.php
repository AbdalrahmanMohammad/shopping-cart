<?php
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class UserController extends Controller
{
    public function getDistinctCities(Request $request)
    {
        try {
            $result = DB::table('users')
                ->select('address')
                ->distinct()
                ->orderBy('address', 'asc')
                ->get();

            return response()->json($result);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Query failed: ' . $e->getMessage()]);
        }
    }
}
