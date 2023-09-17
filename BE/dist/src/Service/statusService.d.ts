export declare class StatusService {
    private statusRepository;
    constructor();
    add: (status: any) => Promise<any>;
    findAll: () => Promise<any>;
    findByIdUser: (id: any) => Promise<any>;
    delete: (statusId: any) => Promise<void>;
    updateVisibility: (statusId: any, visibility: any) => Promise<string>;
    updateContent: (statusId: any, content: any) => Promise<string>;
}
declare const _default: StatusService;
export default _default;