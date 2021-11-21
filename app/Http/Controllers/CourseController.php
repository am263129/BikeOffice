<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function create(Request $request)
    {


        $routeImageName = "";
        $pgwName = "";
        $pdfName = "";

        if ($request->file('routeImage')) {
            $routeImageName = time() . '_' . $request->get("courseName") . "_" . $request->file('routeImage')->getClientOriginalName();
            $routeImage =  $request->file('routeImage')->storeAs('uploads/courses/' . $request->get("courseName"), $routeImageName, 'public');
            $request->file('routeImage')->move(public_path('resource/courses/' . $request->get("courseName") . '/'), $routeImageName);
        }
        if ($request->file('pgw')) {
            $pgwName = time() . '_' . $request->get("courseName") . "_" . $request->file('pgw')->getClientOriginalName();
            $pgw =  $request->file('pgw')->storeAs('uploads/courses/' . $request->get("courseName"), $pgwName, 'public');
            $request->file('pgw')->move(public_path('resource/courses/' . $request->get("courseName") . '/'), $pgwName);
        }
        if ($request->file('pdf')) {
            $pdfName = time() . '_' . $request->get("courseName") . "_" . $request->file('pdf')->getClientOriginalName();
            $pdf =  $request->file('pdf')->storeAs('uploads/courses/' . $request->get("courseName"), $pdfName, 'public');
            $request->file('pdf')->move(public_path('resource/courses/' . $request->get("courseName") . '/'), $pdfName);
        }

        $result = Course::create([
            "description" => $request->get('description'),
            "city" => $request->get('city'),
            "courseName" => $request->get("courseName"),
            "type" => $request->get("type"),
            "city" => $request->get("city"),
            "start" => $request->get("start"),
            "end" => $request->get("end"),
            "graus" => $request->get("graus"),
            "predominant" => $request->get("predominant"),
            "routeImage" => $routeImageName,
            "avslope" => $request->get("avslope"),
            "pgw" => $pgwName,
            "restZones" => $request->get("restZones"),
            "pdf" => $pdfName,
            "distance" => $request->get("distance"),
            "turns" => $request->get("turns"),
            "description" => $request->get("description"),
        ]);



        return response()->json($result);
    }



    public function getCourse(Request $request)
    {
        if ($request->has("id")) {
            $result = Course::find($request->get("id"));
            return response()->json($result);
        }
        $graus = $request->has("graus") ? $request->get("graus") : "";
        $city = $request->has("city") ? $request->get('city') : "";
        $type = $request->has("type") ? $request->get('type') : "";
        //do serach option
        if ($graus != "" && $city != "") {
            $result = Course::select()
                ->where([['graus', "=", $graus], ['city', '=', $city]])
                ->get();
        } else {
            $result = Course::select()->get();
        }
        return response()->json($result);
    }


    public function updateCourse(Request $request)
    {
        
        $routeImageName = "";
        $pgwName = "";
        $pdfName = "";

        if ($request->file('routeImage')) {
            $routeImageName = time() . '_' . $request->get("courseName") . "_" . $request->file('routeImage')->getClientOriginalName();
            $routeImage =  $request->file('routeImage')->storeAs('uploads/courses/' . $request->get("courseName"), $routeImageName, 'public');
            $request->file('routeImage')->move(public_path('resource/courses/' . $request->get("courseName") . '/'), $routeImageName);
        }
        if ($request->file('pgw')) {
            $pgwName = time() . '_' . $request->get("courseName") . "_" . $request->file('pgw')->getClientOriginalName();
            $pgw =  $request->file('pgw')->storeAs('uploads/courses/' . $request->get("courseName"), $pgwName, 'public');
            $request->file('pgw')->move(public_path('resource/courses/' . $request->get("courseName") . '/'), $pgwName);
        }
        if ($request->file('pdf')) {
            $pdfName = time() . '_' . $request->get("courseName") . "_" . $request->file('pdf')->getClientOriginalName();
            $pdf =  $request->file('pdf')->storeAs('uploads/courses/' . $request->get("courseName"), $pdfName, 'public');
            $request->file('pdf')->move(public_path('resource/courses/' . $request->get("courseName") . '/'), $pdfName);
        }

        $course = Course::find($request->get('id'));
        $course->city = $request->get('city');
        $course->courseName = $request->get("courseName");
        $course->type = $request->get("type");
        $course->start = $request->get("start");
        $course->end = $request->get("end");
        $course->graus = $request->get("graus");
        $course->predominant = $request->get("predominant");
        $course->routeImage = $routeImageName;
        $course->avslope = $request->get("avslope");
        $course->pgw = $pgwName;
        $course->restZones = $request->get("restZones");
        $course->pdf = $pdfName;
        $course->distance = $request->get("distance");
        $course->turns = $request->get("turns");
        $course->description = $request->get("description");
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
