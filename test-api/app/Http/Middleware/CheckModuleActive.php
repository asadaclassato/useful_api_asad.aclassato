<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckModulesActive
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
         $module_id = user_modules::findOrFail($id); // Cherchez l'enregistrement

        if ($module_id->active == true ) {
            // Si les conditions sont remplies, passez à la requête suivante.
            return $next($request);
        }
        
    }
}
