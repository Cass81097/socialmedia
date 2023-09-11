export declare class UserService {
    private userRepository;
    constructor();
    findAll: () => Promise<any>;
    findAllUserName: () => Promise<any>;
    update: (id: any, user: any) => Promise<any>;
    register: (user: any) => Promise<any>;
    findByUserName: (username: any) => Promise<any>;
    checkUser: (user: any) => Promise<"Email is not exist" | "Password is wrong" | {
        token: any;
        id: any;
        name: any;
        email: any;
        username: any;
        password: any;
        status: any;
        image: any;
        gender: any;
    }>;
}
declare const _default: UserService;
export default _default;
