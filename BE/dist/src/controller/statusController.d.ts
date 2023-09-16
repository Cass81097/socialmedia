import { Request, Response } from "express";
export declare class StatusController {
    findAll: (req: any, res: any) => Promise<void>;
    add: (req: any, res: any) => Promise<void>;
    delete: (req: any, res: any) => Promise<void>;
    updateContent: (req: Request, res: Response) => Promise<void>;
    updateVisibility: (req: Request, res: Response) => Promise<void>;
    findAllByIdUser: (req: any, res: any) => Promise<void>;
}
declare const _default: StatusController;
export default _default;
