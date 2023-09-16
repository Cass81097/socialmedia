export declare class LikeService {
    private likeRepository;
    constructor();
    getLikeForStatus: (id: any) => Promise<{
        listUserLike: any[];
        likeCount: any;
    }>;
    save: (data: any) => Promise<any>;
    delete: (statusId: any) => Promise<any>;
    update: (id: any, user: any) => Promise<any>;
}
declare const _default: LikeService;
export default _default;
