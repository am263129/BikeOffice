<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
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
            return response()->json(["result" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }

        $result = User::create([
            "name" => $request->get("name"),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password'))
        ]);
        if ($result) {
            $response['result'] = 'success';
            $response['message'] = 'registered successfully';
        } else {
            $response['result'] = 'error';
            $response['message'] = 'regist failed';
        }
        return response()->json($response);
    }



    public function signin(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password' => 'required'
        ]);
        $credentials = $request->only('email', 'password');
        $result = Auth::attempt($credentials);
        if ($result) {
            $user = auth()->user();
            $response['token'] =  $user->createToken('Laravel')->accessToken;
            $response['result'] = 'success';
            $response['message'] = 'login success';
        } else{
            $response['result'] = 'error';
            $response['message'] = 'login failed';
        }
        return response()->json($response);
    }
}
