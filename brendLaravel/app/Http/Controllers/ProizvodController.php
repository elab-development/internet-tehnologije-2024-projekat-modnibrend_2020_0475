<?php

namespace App\Http\Controllers;

use App\Models\Proizvod;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class ProizvodController extends Controller
{
    public function index()
    {
        $proizvodi = Proizvod::all();
        return response()->json($proizvodi, 200);
    }

    public function show($id)
    {
        $proizvod = Proizvod::findOrFail($id);
        return response()->json($proizvod, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'opis' => 'nullable|string',
            'cena' => 'required|numeric|min:0',
            'kolekcija_id' => 'required|exists:kolekcijas,id',
            'slika' => 'nullable|string',
            'dostupan' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $proizvod = Proizvod::create($request->all());

        return response()->json([
            'message' => 'Proizvod uspešno kreiran.',
            'proizvod' => $proizvod,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $proizvod = Proizvod::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naziv' => 'required|string|max:255',
            'opis' => 'nullable|string',
            'cena' => 'required|numeric|min:0',
            'kolekcija_id' => 'required|exists:kolekcijas,id',
            'slika' => 'nullable|string',
            'dostupan' => 'boolean',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $proizvod->update($request->all());

        return response()->json([
            'message' => 'Proizvod uspešno ažuriran.',
            'proizvod' => $proizvod,
        ], 200);
    }

    public function destroy($id)
    {
        $proizvod = Proizvod::findOrFail($id);
        $proizvod->delete();

        return response()->json([
            'message' => 'Proizvod uspešno obrisan.',
        ], 200);
    }
}
