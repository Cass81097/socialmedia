export default class PostService {
    private userRepository;
    constructor();
    getStatus: (id: any) => Promise<{
        listUsers: any;
        likeCount: any;
    }>;
}
