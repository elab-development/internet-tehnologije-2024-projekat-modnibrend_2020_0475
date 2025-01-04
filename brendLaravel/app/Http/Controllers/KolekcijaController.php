<?php

namespace App\Http\Controllers;

use App\Models\Kolekcija;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class KolekcijaController extends Controller
{
    public function index()
    {
        $kolekcije = Kolekcija::all();
        return response()->json($kolekcije, 200);
    }

    public function show($id)
    {
        $kolekcija = Kolekcija::with('proizvodi')->findOrFail($id);
        return response()->json($kolekcija, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'opis' => 'nullable|string',
            'datum_objave' => 'required|date',
            'slika' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $kolekcija = Kolekcija::create($request->all());

        return response()->json([
            'message' => 'Kolekcija uspešno kreirana.',
            'kolekcija' => $kolekcija,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $kolekcija = Kolekcija::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'opis' => 'nullable|string',
            'datum_objave' => 'required|date',
            'slika' => 'nullable|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $kolekcija->update($request->all());

        return response()->json([
            'message' => 'Kolekcija uspešno ažurirana.',
            'kolekcija' => $kolekcija,
        ], 200);
    }

    public function destroy($id)
    {
        $kolekcija = Kolekcija::findOrFail($id);
        $kolekcija->delete();

        return response()->json([
            'message' => 'Kolekcija uspešno obrisana.',
        ], 200);
    }
}
