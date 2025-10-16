<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;



class Module extends Model
{
    public function user_modules(): HasMany 
{ 
    return $this->hasMany(user_modules::class); 
}
}
