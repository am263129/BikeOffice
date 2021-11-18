<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function create(Request $request)
    {
        $result = Course::create([
            "description" => $request->get('description'),
            "city" => $request->get('city')
        ]);
        return response()->json($result);
    }



    public function getCourse(Request $ruquest)
    {
        $graus = $request->has("graus")?$request->get("graus"):"";
        $city = $request->has("city")?$request->get('city'):"";
        $type = $request->has("type")?$requset->get('type'):"";

        //do serach option
        $result = Course::select()->get();
        return response()->json($result);
    }


    public function updateCourse(Request $request)
    {
        $course = Course::find($request->get('id'));
        $course->description = $request->get('description');
        $course->city = $request->get('city');
        $result = $course->update();
        if ($result) {
            $response['result'] = 'success';
            $response['message'] = 'Updated Successfully';
            $response['data'] = Course::select()->get();
        } else {
            $response['result'] = 'error';
            $response['message'] = 'Delete Failed';
        }
        return response()->json($response);
    }


    public function delete(Request $request)
    {
        $item = Course::find($request->get('id'));
        if ($item) {
            $result = $item->delete();
            if ($result) {
                $response['result'] = 'success';
                $response['message'] = 'Deleted Successfully';
            } else {
                $response['result'] = 'error';
                $response['message'] = 'Delete Failed';
            }
        } else {
            $response['result'] = 'error';
            $response['message'] = 'item not exist';
        }
        return response()->json($response);
    }
}
