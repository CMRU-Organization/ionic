<?php

namespace App\Http\Middleware;

use Closure;

class CorsMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        if($request->is('api/*') && \App::environment('local')) {
            header('Access-Control-Allow-Origin: *');
            header('Access-Control-Allow-Methods: GET, POST, PUT, PATCH, DELETE');
            header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token, Authorization');
        }
        return $next($request);
    }
}
