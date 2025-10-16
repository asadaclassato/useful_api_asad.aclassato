<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;


class LoginController extends Controller
{
    public function login(Request $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Identifiants invalides'
            ], 401);
        }

      /*   $token = $user->createToken('auth_token')->plainTextToken; */

        return response()->json([
            'message' => 'Connexion réussie',
            'user' => $user,
          /*   'access_token' => $token, */
            'token_type' => 'Bearer',
        ]);
    }
}