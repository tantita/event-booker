<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\User;

use JWTAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class AuthApiController extends Controller
{
    //

    public function login(Request $request){
    	 // grab credentials from the request
        $credentials = $request->only('email', 'password');

        try {
            // attempt to verify the credentials and create a token for the user
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'invalid_credentials'], 401);
            }
        } catch (JWTException $e) {
            // something went wrong whilst attempting to encode the token
            return response()->json(['error' => 'could_not_create_token'], 500);
        }

        // all good so return the token
        return response()->json(compact('token'));

	   
    }


    public function signup(Request $request){
    	// grab credentials from the request
    	$credentials = $request->only('name','email', 'password');

    	// encrypt the password
    	$credentials['password'] = bcrypt($credentials['password']);

    	try {
	        $user = User::create($credentials);
	    }catch (\Exception $e) {
	        return Response::json(['error' => 'User already exists.'], 400);
	    }

	   $token = JWTAuth::fromUser($user);

	   // all good so return the tokens
	   return response()->json(compact('token'));
    }
}
