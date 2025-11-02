"use client"
import { Suspense, useEffect, useState } from "react";

interface Book {
  _id: string;
  name: string;
  author: string;
  publishedDate: string;
  createdAt: string;
}

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);
  

  useEffect(() => {
    fetchBook();
  }, []);

  const fetchBook = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/books");
      const result = await response.json();
      
      if (result.success) {
        setBooks(result.data);
      }
    } catch (error) {
      console.error("Error fetching books:", error);
      setErrorMessage("Failed to load books");
    }finally{
      setIsLoading(false)
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this book?")) return;

    try {
      const response = await fetch(`/api/books?id=${id}`, {
        method: "DELETE",
      });

      const result = await response.json();

      if (result.success) {
        setErrorMessage("Deleted the book");
        fetchBook(); 
      } else {
        console.log(result.error);
        setErrorMessage("Failed to delete book");
      }
    } catch (error) {
      setErrorMessage("Something went wrong. Contact IT department");
      console.error(error);
    }
  };

  return (
    <div>
      <div>
        <h1 className="text-black text-4xl m-2">Current Books in Library</h1>
        {errorMessage && (
          <p className="text-red-600 mt-2">{errorMessage}</p>
        )}
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold">All Books</h2>
        </div>
       {isLoading ? (
          <div className="p-6 text-center text-gray-900 text-2xl">
            Loading Please wait....
          </div>
        ) : (
        <div className="divide-y divide-gray-200">
          {books.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              No books added yet. Add a book in book manager section!
            </div>
          ) : (
            books.map((book) => (
              <div
                key={book._id}
                className="p-6 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {book.name}
                    </h3>
                    <p className="text-gray-600 mt-1">By {book.author}</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Published:{" "}
                      {new Date(book.publishedDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(book._id)}
                    className="text-red-600 hover:text-red-800 font-medium"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        )}
      </div>
    </div>
  );
}