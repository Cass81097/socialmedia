export declare class StatusService {
    private statusRepository;
    constructor();
    add: (status: any) => Promise<any>;
    findAll: () => Promise<any>;
    findStatusByIdUser: (senderId: any, receiverId: any) => Promise<any>;
    findByIdUser: (id: any) => Promise<any>;
    findByIdAndStatus: (id: any) => Promise<any>;
    delete: (statusId: any) => Promise<string>;
    updateVisibility: (statusId: any, visibility: any) => Promise<string>;
    updateContent: (statusId: any, content: any) => Promise<string>;
    findByContent: (id: any, content: any) => Promise<any>;
}
declare const _default: StatusService;
export default _default;
