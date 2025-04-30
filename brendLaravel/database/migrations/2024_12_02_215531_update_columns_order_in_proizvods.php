<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class UpdateColumnsOrderInProizvods extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('proizvods', function (Blueprint $table) {
            $table->dropColumn('opis');
        });
    
        Schema::table('proizvods', function (Blueprint $table) {
            $table->text('opis')->nullable()->after('naziv');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('proizvods', function (Blueprint $table) {
            $table->dropColumn('opis');
        });
    
        Schema::table('proizvods', function (Blueprint $table) {
            $table->text('opis')->nullable()->after('cena');
        });
    }
}
