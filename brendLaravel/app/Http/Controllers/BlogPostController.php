<?php

namespace App\Http\Controllers;

use App\Models\BlogPost;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BlogPostController extends Controller
{
    public function index()
    {
        $blogPosts = BlogPost::all();
        return response()->json($blogPosts, 200);
    }

    public function show($id)
    {
        $blogPost = BlogPost::findOrFail($id);
        return response()->json($blogPost, 200);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'naslov' => 'required|string|max:255',
            'sadrzaj' => 'required|string',
            'autor' => 'required|string|max:255',
            'datum_objave' => 'nullable|date',
            'kategorija' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $blogPost = BlogPost::create($request->all());

        return response()->json([
            'message' => 'Blog post uspešno kreiran.',
            'blogPost' => $blogPost,
        ], 201);
    }

    public function update(Request $request, $id)
    {
        $blogPost = BlogPost::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'naslov' => 'required|string|max:255',
            'sadrzaj' => 'required|string',
            'autor' => 'required|string|max:255',
            'datum_objave' => 'nullable|date',
            'kategorija' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $blogPost->update($request->all());

        return response()->json([
            'message' => 'Blog post uspešno ažuriran.',
            'blogPost' => $blogPost,
        ], 200);
    }

    public function destroy($id)
    {
        $blogPost = BlogPost::findOrFail($id);
        $blogPost->delete();

        return response()->json([
            'message' => 'Blog post uspešno obrisan.',
        ], 200);
    }
}
