<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function Register(Request $request)
    {

        $validator = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'email' => 'required|email|unique:users',
                'password' => 'required|min:6',
            ]
        );

        if ($validator->fails()) {
            return response()->json(["status" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }

        $result = User::create([
            "name" => $request->get("name"),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password'))
        ]);
        if ($result) {
            $response['status'] = 'success';
            $response['message'] = 'registered successfully';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'regist failed';
        }
        return response()->json($response);
    }
}
