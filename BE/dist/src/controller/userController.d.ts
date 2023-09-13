import { Request, Response } from "express";
export declare class UserController {
    register: (req: Request, res: Response) => Promise<void>;
    login: (req: Request, res: Response) => Promise<void>;
    update: (req: Request, res: Response) => Promise<void>;
    findAll: (req: any, res: any) => Promise<void>;
    findByUserName: (req: any, res: any) => Promise<void>;
    findByEmail: (req: any, res: any) => Promise<void>;
    findAllUserName: (req: any, res: any) => Promise<void>;
    findUserByName: (req: any, res: any) => Promise<void>;
    findUserById: (req: any, res: any) => Promise<void>;
    updatePassword: (req: Request, res: Response) => Promise<void>;
    updateAvatar: (req: Request, res: Response) => Promise<void>;
    updateCover: (req: Request, res: Response) => Promise<void>;
}
declare const _default: UserController;
export default _default;
