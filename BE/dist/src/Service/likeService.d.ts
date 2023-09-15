export declare class LikeService {
    private likeRepository;
    constructor();
    getLikeForStatus: (id: any) => Promise<{
        listUsers: any;
        likeCount: any;
    }>;
    save: (idUser: any, idStatus: any) => Promise<any>;
    delete: (id: any) => Promise<any>;
    update: (id: any, user: any) => Promise<any>;
}
declare const _default: LikeService;
export default _default;
