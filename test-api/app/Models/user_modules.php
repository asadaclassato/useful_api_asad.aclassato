<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class user_modules extends Model
{
    public function modules(): BelongsTo
{ 
    return $this->belongsTo(Module::class); 
}
}
