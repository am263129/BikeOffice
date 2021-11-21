<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Password;

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
            'password' => Hash::make($request->get('password')),
            'role'=>'user'
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
            $response['role'] = $user->role;
        } else {
            $response['result'] = 'error';
            $response['message'] = 'login failed';
        }
        return response()->json($response);
    }


    public function sendLink(Request $request)

    {

        $validator = Validator::make(
            $request->all(),
            [
                'email' => 'required|email',
            ]
        );
        if ($validator->fails()) {
            return response()->json(["result" => "failed", "message" => "Validation error", "errors" => $validator->errors()]);
        }
        $status = Password::sendResetLink(
            $request->only('email')
        );

        $result = [];
        if ($status === Password::RESET_LINK_SENT) {
            $result['status'] = "success";
        } else {
            $result['status'] = "error";
        }
        return response()->json($result);
        // return 
        //     ? back()->with(['status' => "__($status)"])
        //     : back()->withErrors(['email' => __($status)]);
    }

    public function resetPassword(Request $request) {
        $request->validate([
            'token' => 'required',
            'email' => 'required|email',
            'password' => 'required|min:8|confirmed',
        ]);
    
        $status = Password::reset(
            $request->only('email', 'password', 'password_confirmation', 'token'),
            function ($user, $password) {
                $user->forceFill([
                    'password' => Hash::make($password)
                ])->setRememberToken(Str::random(60));
    
                $user->save();
    
                event(new PasswordReset($user));
            }
        );
    
        return $status === Password::PASSWORD_RESET
                    ? redirect()->route('login')->with('status', __($status))
                    : back()->withErrors(['email' => [__($status)]]);
    }
}
