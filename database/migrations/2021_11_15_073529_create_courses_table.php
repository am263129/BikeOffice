<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCoursesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('courses', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->string("courseName");
            $table->integer("type");
            $table->string("city");
            $table->string("start");
            $table->string("end");
            $table->string("graus");
            $table->string("predominant");
            $table->string("routeImage");
            $table->string("avslope");
            $table->string("pgw");
            $table->string("restZones");
            $table->string("pdf");
            $table->string("distance");
            $table->string("turns");
            $table->string("description");
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('courses');
    }
}
