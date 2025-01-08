import { model, Schema } from "mongoose";
import { books } from "../../interfaces/book";
import mongoose from 'mongoose';
mongoose.set('strictQuery', false); // 關閉嚴格模式
const bookSchema = new Schema<books>({
    ISBN: { type: String, required: true },
    bookname: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    edition: { type: String, required: true },
  });
  
  // 書籍模型
  export const BooksModel = model<books>('bookdb', bookSchema,'bookdb');
  