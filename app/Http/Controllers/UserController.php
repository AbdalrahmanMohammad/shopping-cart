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
    public function handleRequest(Request $request)
    {
        try {
            if ($request->isMethod('post')) {
                // Retrieve form data
                $operation = $request->input('operation');
                $id = $request->input('id');
                $name = $request->input('name');
                $address = $request->input('address');
                $newName = $request->input('new-name');
                $newAddress = $request->input('new-address');

                if ($operation == "insert") {
                    DB::table('users')->insert([
                        'name' => $name,
                        'address' => $address
                    ]);
                    return response()->json($this->getAllUsers(), 200);
                }

                if ($operation == "select") {
                    $query = DB::table('users');

                    if ($name) {
                        $query->where('name', '=', $name);
                    }
                    if ($address) {
                        $query->where('address', '=', $address);
                    }

                    $users = $query->orderBy('id', 'asc')->get();
                    return response()->json($users, 200);
                }

                if ($operation == "delete") {
                    $query = DB::table('users');

                    if ($id) {
                        $query->where('id', '=', $id);
                    }
                    if ($name) {
                        $query->where('name', '=', $name);
                    }
                    if ($address) {
                        $query->where('address', '=', $address);
                    }

                    $query->delete();
                    return response()->json($this->getAllUsers(), 200);
                }

                if ($operation == "update") {
                    $query = DB::table('users');

                    if ($id) {
                        $query->where('id', '=', $id);
                    }
                    if ($name) {
                        $query->where('name', '=', $name);
                    }
                    if ($address) {
                        $query->where('address', '=', $address);
                    }

                    $updateData = [];
                    if ($newName) {
                        $updateData['name'] = $newName;
                    }
                    if ($newAddress) {
                        $updateData['address'] = $newAddress;
                    }

                    if (count($updateData) > 0) {
                        $query->update($updateData);
                        return response()->json($this->getAllUsers(), 200);
                    } else {
                        return response()->json(['error' => 'No new values provided for update.'], 400);
                    }
                }
            }
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    private function getAllUsers()
    {
        return DB::table('users')->orderBy('id', 'asc')->get();
    }
}
