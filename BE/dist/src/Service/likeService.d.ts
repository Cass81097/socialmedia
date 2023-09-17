export declare class LikeService {
    private likeRepository;
    constructor();
    getLikeForStatus: (id: any) => Promise<{
        likeRecords: any;
        likeCount: any;
    }>;
    save: (statusId: any, userId: any) => Promise<any>;
    deleteByUserIdAndStatusId: (statusId: any, userId: any) => Promise<any>;
    update: (id: any, user: any) => Promise<any>;
}
declare const _default: LikeService;
export default _default;
