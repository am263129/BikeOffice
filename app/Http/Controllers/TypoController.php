<?php

namespace App\Http\Controllers;

use App\Models\Typology;
use Illuminate\Http\Request;

class TypoController extends Controller
{
    public function create(Request $request)
    {
        $result = Typology::create([
            "name" => $request->get('data')
        ]);
        return response()->json($result);
    }



    public function getTypos(Request $ruquest)
    {
        $result = Typology::select()->get();
        return response()->json($result);
    }


    public function delete(Request $request)
    {
        $item = Typology::find($request->get('id'));
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
