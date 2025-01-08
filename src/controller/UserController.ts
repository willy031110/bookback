import { Contorller } from "../abstract/Contorller";
import { Request, Response } from "express";
import { UserService } from "../Service/UserService";
import { resp } from "../utils/resp";
import { DBResp } from "../interfaces/DBResp";
import { books } from "../interfaces/book";

export class UserController extends Contorller {
    protected service: UserService;

    constructor() {
        super();
        this.service = new UserService();
    }

    // 查詢所有書籍
    public async findAll(Request: Request, Response: Response) {
        const res: resp<Array<DBResp<books>> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };

        const dbResp = await this.service.getAllbooks();
        if (dbResp) {
            res.body = dbResp;
            res.message = "Find success";
            Response.send(res);
        } else {
            res.code = 500;
            res.message = "Server error";
            Response.status(500).send(res);
        }
    }
// 根據書名或 ISBN 查詢書籍
public async findBook(Request: Request, Response: Response) {
    const { bookname, ISBN } = Request.query;
    const res: resp<DBResp<books> | null> = {
        code: 200,
        message: "",
        body: null
    };

    if (!bookname && !ISBN) {
        res.code = 400;
        res.message = "Please provide either bookname or ISBN";
        return Response.status(400).send(res);
    }

    const dbResp = await this.service.findBookByNameOrISBN(bookname as string, ISBN as string);
    if (dbResp) {
        res.body = dbResp;
        res.message = "Find success";
        Response.send(res);
    } else {
        res.code = 404;
        res.message = "Book not found";
        Response.status(404).send(res);
    }
}

    // 新增書籍
    public async create(Request: Request, Response: Response) {
        const newBook: books = Request.body;
        const res: resp<DBResp<books> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };

        const dbResp = await this.service.createBook(newBook);
        if (dbResp) {
            res.body = dbResp;
            res.message = "Create success";
            Response.send(res);
        } else {
            res.code = 500;
            res.message = "Server error";
            Response.status(500).send(res);
        }
    }

    // 更新書籍
    public async update(Request: Request, Response: Response) {
        const { id } = Request.params;
        const updateData: Partial<books> = Request.body;
        const res: resp<DBResp<books> | undefined> = {
            code: 200,
            message: "",
            body: undefined
        };

        const dbResp = await this.service.updateBook(id, updateData);
        if (dbResp) {
            res.body = dbResp;
            res.message = "Update success";
            Response.send(res);
        } else {
            res.code = 500;
            res.message = "Server error";
            Response.status(500).send(res);
        }
    }

    // 刪除書籍
    public async delete(Request: Request, Response: Response) {
        const { id } = Request.params;
        const res: resp<boolean> = {
            code: 200,
            message: "",
            body: false
        };

        const dbResp = await this.service.deleteBook(id);
        if (dbResp) {
            res.body = true;
            res.message = "Delete success";
            Response.send(res);
        } else {
            res.code = 500;
            res.message = "Server error";
            Response.status(500).send(res);
        }
    }
}
