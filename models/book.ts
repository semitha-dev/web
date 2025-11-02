// models/Book.ts
import mongoose, { Schema, Document, Model } from "mongoose";

export interface IBook extends Document {
  name: string;
  author: string;
  publishedDate: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BookSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Book name is required"],
      trim: true,
    },
    author: {
      type: String,
      required: [true, "Author name is required"],
      trim: true,
    },
    publishedDate: {
      type: Date,
      required: [true, "Published date is required"],
    },
  },
  {
    timestamps: true, 
  }
);

let Book: Model<IBook>;

try {
  // Try to get existing model
  Book = mongoose.model<IBook>("Book");
} catch {
  // If model doesn't exist, create it
  Book = mongoose.model<IBook>("Book", BookSchema);
}

export default Book;