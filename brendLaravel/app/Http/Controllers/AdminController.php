<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\Kolekcija;
use App\Models\Proizvod;
use App\Models\User;
use Dotenv\Validator;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function getUsers()
    {
        $users = User::all();
        return response()->json($users, 200);
    }

    public function updateUserRole(Request $request, $id)
    {

        $user = User::findOrFail($id);
        $user->role = $request->role;
        $user->save();

        return response()->json(['message' => 'Uloga korisnika uspešno ažurirana.', 'user' => $user], 200);
    }

    public function getStatistics()
    {
        // Broj korisnika po ulozi
        $userRoles = User::selectRaw('role, COUNT(*) as count')->groupBy('role')->get();

        // Ukupan broj kolekcija
        $totalCollections = Kolekcija::count();

        // Broj proizvoda u svakoj kolekciji
        $productsPerCollection = Kolekcija::withCount('proizvodi')->get();

        // Ukupna vrednost svih proizvoda
        $totalProductValue = Proizvod::sum('cena');

        // Broj dostupnih i nedostupnih proizvoda
        $availableProducts = Proizvod::where('dostupan', true)->count();
        $unavailableProducts = Proizvod::where('dostupan', false)->count();

        // Dinamika kreiranja kolekcija po mesecima
        $collectionsByMonth = Kolekcija::selectRaw('DATE_FORMAT(datum_objave, "%Y-%m") as month, COUNT(*) as count')
            ->groupBy('month')
            ->orderBy('month', 'ASC')
            ->get();

        return response()->json([
            'userRoles' => $userRoles,
            'totalCollections' => $totalCollections,
            'productsPerCollection' => $productsPerCollection,
            'totalProductValue' => $totalProductValue,
            'availableProducts' => $availableProducts,
            'unavailableProducts' => $unavailableProducts,
            'collectionsByMonth' => $collectionsByMonth,
        ], 200);
    }
}

    
