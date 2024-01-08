<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {

        DB::table('types')->insert(
            array(
                'type' => 'Заблокированоое',
                'color' => 'c0c0c0',
                'created_at' => '2023-10-28 23:09:42',
                'updated_at' => '2023-10-28 23:09:42',
            )
        );

        DB::table('types')->insert(
            array(
                'type' => 'Обычное',
                'color' => '63536C',
                'created_at' => '2023-10-28 23:09:42',
                'updated_at' => '2023-10-28 23:09:42',
            )
        );

        DB::table('types')->insert(
            array(
                'type' => 'VIP',
                'color' => 'cfb53b',
                'created_at' => '2023-10-28 23:09:42',
                'updated_at' => '2023-10-28 23:09:42',
            )
        );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('table_types', function (Blueprint $table) {
            //
        });
    }
};
