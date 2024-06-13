<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UsersSeeder extends Seeder
{
    /**
     * Предзаполняем таблицу с типами мест
     */
    public function run(): void
    {
        User::factory()->create([
            'name' => 'John Doe',
            'email' => 'test@test.com',
            'password' => bcrypt('P@ssw0rd'),
            'email_verified_at' => time(),
        ]);
    }
}
