import { Route } from "../abstract/Route";
import { UserController } from "../controller/UserController";

export class UserRoute extends Route {
    
    protected url: string;
    protected Contorller = new UserController();

    constructor() {
        super()
        this.url = '/api/v1/user/';
        this.setRoutes();
    }

    protected setRoutes(): void {
        // 查詢所有書籍
        this.router.get(`${this.url}findAll`, (req, res) => {
            this.Contorller.findAll(req, res);
        });
        // 根據書名或 ISBN 查詢書籍
        this.router.get(`${this.url}findBook`, (req, res) => {
            this.Contorller.findBook(req, res);
        });
        // 根據 ID 查詢書籍
this.router.get(`${this.url}findBookById`, (req, res) => {
    this.Contorller.findBookById(req, res);
});
        // 新增書籍
        this.router.post(`${this.url}create`, (req, res) => {
            this.Contorller.create(req, res);
        });

        // 更新書籍
        this.router.put(`${this.url}update/:id`, (req, res) => {
            this.Contorller.update(req, res);
        });

        // 刪除書籍
        this.router.delete(`${this.url}delete/:id`, (req, res) => {
            this.Contorller.delete(req, res);
        });
    }
}
