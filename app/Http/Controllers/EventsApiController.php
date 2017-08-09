<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Event, App\Stand;

class EventsApiController extends Controller
{
    //
    public function index(){
    	return Event::all();
    }

    public function getEventStands($id){
    	$event = Event::findOrFail($id);
    	return $event->stands;
    }


    public function getStand($id){
    	$stand = Stand::findOrFail($id);
    	return $stand;
    }

    public function uploadFile(Request $request){

    	$file = $request->file('file');
        $filename = $file->getClientOriginalName();
        $extension = $file -> getClientOriginalExtension();
        $image = $filename;
        $destinationPath = public_path() . '/uploads/';
        $file->move($destinationPath, $image);
    

    }


    public function createBooking(Request $request){
    	$stand_id = $request->get('stand_id');

    	$stand = Stand::findOrFail($stand_id);

    	$stand->email = $request->get('company_admin_email');
    	$stand->logo = $request->get('logo');
    	$stand->address = $request->get('address');
    	$stand->email = $request->get('email');
    	$stand->phone = $request->get('phone');
    	$stand->documents = $request->get('documents');

    	$stand->save();

    	return "Booked successfully";
    }
}
