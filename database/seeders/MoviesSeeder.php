<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class MoviesSeeder extends Seeder
{
    /**
     * Предзаполняем таблицу с типами мест
     */
    public function run(): void
    {
        DB::table('movies')->insert([
            'img' => 'images/Vw8uLAHtahhZzvKe.jpeg',
            'title' => 'Звёздные войны: Эпизод 3',
            'description' => 'Идёт третий год Войн клонов. Галактическая Республика, некогда бывшая спокойным и гармоничным государством, превратилась в поле битвы между армиями клонов, возглавляемых канцлером Палпатином, и армадами дроидов, которых ведёт граф Дуку, тёмный лорд ситхов. Республика медленно погружается во тьму. Лишь рыцари-джедаи, защитники мира и справедливости, могут противостоять злу, которое вскоре поглотит галактику. Но настоящая битва идёт в душе у молодого рыцаря-джедая Энакина, который разрывается между долгом джедая и любовью к своей жене, сенатору Падме Амидале. И от того, какое чувство в нём победит, зависит будущее всего мира.',
            'duration' => 140,
            'origin' => 'США, Италия, Швейцария, Таиланд',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('movies')->insert([
            'img' => 'images/PQHP3f0yE7zleDV8.jpeg',
            'title' => 'Зеленая миля',
            'description' => 'Пол Эджкомб — начальник блока смертников в тюрьме «Холодная гора», каждый из узников которого однажды проходит «зеленую милю» по пути к месту казни. Пол повидал много заключённых и надзирателей за время работы. Однако гигант Джон Коффи, обвинённый в страшном преступлении, стал одним из самых необычных обитателей блока.',
            'duration' => 189,
            'origin' => 'США',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('movies')->insert([
            'img' => 'images/0yuQ8gkTIFkLemnL.jpeg',
            'title' => 'Стартрек: Бесконечность',
            'description' => 'Бесстрашная команда крейсера звездного флота «Энтерпрайз» исследует неизведанные глубины космоса. Во время этого полного опасностей путешествия герои сталкиваются с таинственной силой, ставящей под угрозу не только их миссию и стабильность Федерации, но и весь миропорядок.',
            'duration' => 122,
            'origin' => 'США, Китай, ОАЭ, Канада',
            'created_at' => now(),
            'updated_at' => now(),
        ]);

        DB::table('movies')->insert([
            'img' => 'images/0a3y4JnWuilASX0f.jpeg',
            'title' => 'Интерстеллар',
            'description' => 'Когда засуха, пыльные бури и вымирание растений приводят человечество к продовольственному кризису, коллектив исследователей и учёных отправляется сквозь червоточину (которая предположительно соединяет области пространства-времени через большое расстояние) в путешествие, чтобы превзойти прежние ограничения для космических путешествий человека и найти планету с подходящими для человечества условиями.',
            'duration' => 169,
            'origin' => 'США, Великобритания, Канада',
            'created_at' => now(),
            'updated_at' => now(),
        ]);
    }
}
