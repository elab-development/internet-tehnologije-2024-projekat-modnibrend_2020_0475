<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddPopustToProizvods extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('proizvods', function (Blueprint $table) {
            $table->decimal('popust', 5, 2)->nullable()->after('cena');
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
            $table->dropColumn('popust');
        });
    }
}
