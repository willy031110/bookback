import { Route } from "../abstract/Route";
import { UserController } from "../controller/UserController";
import { logger } from "../middlewares/log";

export class UserRoute extends Route {
    
    protected url: string;
    protected Contorller = new UserController();

    constructor() {
        super()
        this.url = '/api/v1/user/'
        this.setRoutes()
    }

    protected setRoutes(): void {
        
        this.router.get(`${this.url}findAll`, (req, res) => {
            this.Contorller.findAll(req, res);
        })

        // 新增查詢單個學生的路由
        this.router.get(`${this.url}:id`, (req, res) => {
            this.Contorller.getOne(req, res);  // 呼叫 UserController 中的 getOne 方法
        })

        this.router.post(`${this.url}insertOne`, (req, res) => {
            this.Contorller.insertOne(req, res);
        })
        
        this.router.delete(`${this.url}deleteById`, (req, res) => {
            this.Contorller.deleteById(req, res);
        })

        this.router.put(`${this.url}updateNameByID`, (req, res) => {
            this.Contorller.updateNameByID(req, res);
        })
    }
}
