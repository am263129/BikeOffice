<?php

namespace App\Http\Controllers;

use App\Models\City;
use Illuminate\Http\Request;

class CityController extends Controller
{
    public function create(Request $request)
    {
        $result = City::create([
            "name" => $request->get('data')
        ]);
        return response()->json($result);
    }



    public function getCities(Request $ruquest)
    {
        $result = City::select()->get();
        return response()->json($result);
    }


    public function delete(Request $request)
    {
        $item = City::find($request->get('id'));
        if ($item) {
            $result = $item->delete();
            if ($result) {
                $response['result'] = 'success';
                $response['message'] = 'Deleted Successfully';
            } else {
                $response['result'] = 'error';
                $response['message'] = 'Delete Failed';
            }
        } else {
            $response['result'] = 'error';
            $response['message'] = 'item not exist';
        }
        return response()->json($response);
    }
}
