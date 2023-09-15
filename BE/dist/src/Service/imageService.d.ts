export declare class ImageService {
    private imageRepository;
    constructor();
    add: (image: any) => Promise<any>;
    findAll: () => Promise<any>;
    findAllByStatusId: (statusId: any) => Promise<any>;
    delete: (id: any) => Promise<any>;
    update: (id: any, image: any) => Promise<any>;
}
declare const _default: ImageService;
export default _default;
