import { Request, Response } from "express";
export declare class UserController {
    register: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    findAll: (req: any, res: any) => Promise<void>;
}
declare const _default: UserController;
export default _default;
