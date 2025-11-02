"use client"
import { Suspense } from "react";
import {useState, useEffect} from "react";

interface Book {
  _id: string;
  name: string;
  author: string;
  publishedDate: string;
  createdAt: string;
}





export default function Home() {
 
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    author: "",
    publishedDate: "",
  });
  const [errorMessage , setErrorMessage] = useState<String>("");



 
// Create new book Function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true)

    try{
      const response = await fetch("/api/books",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setErrorMessage("Book added successfully!");
        setFormData({ name: "", author: "", publishedDate: "" });
       
      } else {
        alert(`Error: ${result.error}`);
      }

    }catch (error){
      setErrorMessage("Error Adding Book. Try Refreshing the website. If still not working Contact IT department");
      console.error(error)

    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if(!confirm("Are you sure you waant to delete this book")) return;

    try{
      const response = await fetch(`/api/books?id=${id}`,{
        method: "DELETE",
      })

      const result = await response.json();

      if (result.success){
        setErrorMessage("Deleted the book")
     

      }else {
        console.log(result.error)
      }

    }catch(error){
      setErrorMessage("Something went wrong. Contact IT department")
      console.error(error);

    }
  }






  return (
    <div>
   <div  className="text-black flex justify-center p-6 m-4">
        
    <div className=" flex-col items-center p-3 m-5 bg-gray-300 w-full max-w-lg ">
        <h1 className="text-4xl pb-7">Book Management System</h1>
        <h1 className="ml-40 mb-3 text-green-600 ">{errorMessage}</h1>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Book Name */}
          <div className="flex items-center">
            <label className="w-32 text-right mr-4">Book Name</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="flex-1 bg-white rounded-2xl p-2 pl-4"
              required
            />
          </div>

          {/* Book Author */}
          <div className="flex items-center">
            <label className="w-32 text-right mr-4">Book Author</label>
            <input
              type="text"
              value={formData.author}
              onChange={(e) => setFormData({ ...formData, author: e.target.value })}
              className="flex-1 bg-white rounded-2xl p-2 pl-4"
              required
            />
          </div>

          {/* Published Date */}
          <div className="flex items-center">
            <label className="w-32 text-right mr-4">Published Date</label>
            <input
              type="date"
              value={formData.publishedDate}
              onChange={(e) =>
                setFormData({ ...formData, publishedDate: e.target.value })
              }
              className="flex-1 bg-white rounded-2xl p-2 pl-4"
              required
            />
          </div>
           <button
              type="submit"
              disabled={loading}
              className="w-32 ml-45 bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors "
            >
              {loading ? "Adding..." : "Add Book"}
            </button>
        </form>
        </div>
        
    
  
   </div>
  
      </div>
   
  );
}
