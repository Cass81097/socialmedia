export declare class UserService {
    private userRepository;
    constructor();
    findAll: () => Promise<any>;
    findAllUserName: () => Promise<any>;
    update: (id: any, user: any) => Promise<any>;
    register: (user: any) => Promise<any>;
    findByUserName: (username: any) => Promise<any>;
    findByName: (username: any) => Promise<any>;
    findByEmail: (email: any) => Promise<any>;
    findUserById: (id: any) => Promise<any>;
    updateAvatar: (userId: any, avatar: any) => Promise<string>;
    updateCover: (userId: any, cover: any) => Promise<string>;
    updatePassword: (userId: any, oldPassword: any, newPassword: any) => Promise<string>;
    checkUser: (user: any) => Promise<"Emailkhông tồn tại" | "Mật khẩu không đúng" | {
        token: any;
        id: any;
        fullname: any;
        email: any;
        username: any;
        password: any;
        status: any;
        avatar: any;
        cover: any;
        gender: any;
    }>;
}
declare const _default: UserService;
export default _default;
