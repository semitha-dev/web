// app/api/books/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToMongo } from "@/lib/mongo";
import Book from "../../../models/book";

// GET all books
export async function GET() {
  try {
    await connectToMongo();
    const books = await Book.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: books });
  } catch (error: any) {
    console.error("error when fetching the books " , error)
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST new book
export async function POST(request: NextRequest) {
  try {
    console.log("Connecting to MongoDB...");
    await connectToMongo();
    console.log("Connected successfully");
    
    const body = await request.json();
    console.log("Request body:", body);
    
    // Check if all fields are there
    if (!body.name || !body.author || !body.publishedDate) {
      return NextResponse.json(
        { success: false, error: "All fields are required" },
        { status: 400 }
      );
    }

    console.log("Creating book...");
    const book = await Book.create({
      name: body.name,
      author: body.author,
      publishedDate: new Date(body.publishedDate),
    });
    console.log("Book created:", book);

    return NextResponse.json({ success: true, data: book }, { status: 201 });
  } catch (error: any) {
    console.error("Error in POST /api/books:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// DELETE a book
export async function DELETE(request: NextRequest) {
  try {
    await connectToMongo();
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Book ID is required" },
        { status: 400 }
      );
    }

    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      return NextResponse.json(
        { success: false, error: "Book not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: book });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}