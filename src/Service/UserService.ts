import { Service } from "../abstract/Service";
import { books } from "../interfaces/book";
import { BooksModel } from "../orm/schemas/booksSchemas";
import { DBResp } from "../interfaces/DBResp";
import { resp } from "../utils/resp";
import { Types } from 'mongoose';

type seatInfo = {
    schoolName: string,
    department: string,
    seatNumber: string
};

export class UserService extends Service {
    
    // 查詢所有書籍
    public async getAllbooks(): Promise<Array<DBResp<books>> | undefined> {
        try {
            const res: Array<DBResp<books>> = await BooksModel.find({});
            return res;
        } catch (error) {
            return undefined;
        }
    }
// 根據書名或 ISBN 查詢書籍
public async findBookByNameOrISBN(bookname: string, ISBN: string): Promise<DBResp<books> | null> {
    try {
        const query: any = {};

        if (bookname) query.bookname = { $regex: bookname, $options: 'i' }; // 書名模糊查詢
        if (ISBN) query.ISBN = ISBN; // 精確查詢 ISBN

        const book = await BooksModel.findOne(query);
        return book;
    } catch (error) {
        return null;
    }
}
// 根據書籍 ID 查詢書籍
public async findBookById(id: string): Promise<DBResp<books> | null> {
    try {
        // 使用 mongoose 的 findById 方法查詢書籍資料
        const book = await BooksModel.findById(id);
        return book ? book : null;  // 返回查詢結果
    } catch (error) {
        console.error("Error finding book by ID:", error);
        return null;  // 如果查詢失敗，返回 null
    }
}

    // 新增書籍
    public async createBook(newBook: books): Promise<DBResp<books> | undefined> {
        try {
            const res: DBResp<books> = await BooksModel.create(newBook);
            return res;
        } catch (error) {
            return undefined;
        }
    }

    // 更新書籍
    public async updateBook(bookId: string, updateData: Partial<books>): Promise<DBResp<books> | undefined> {
        try {
            const res: DBResp<books> | null = await BooksModel.findByIdAndUpdate(bookId, updateData, { new: true });
            return res || undefined;
        } catch (error) {
            return undefined;
        }
    }

    // 刪除書籍
    public async deleteBook(bookId: string): Promise<boolean> {
        try {
            const res = await BooksModel.findByIdAndDelete(bookId);
            return !!res;
        } catch (error) {
            return false;
        }
    }
}
