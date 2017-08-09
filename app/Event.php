<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Event extends Model
{
    //

    public function stands(){
    	return $this->hasMany(Stand::class);
    }
}
