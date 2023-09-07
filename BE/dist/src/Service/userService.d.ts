export declare class UserService {
    private repository;
    constructor();
    findAll: () => Promise<any>;
    update: (id: any, user: any) => Promise<any>;
    register: (user: any) => Promise<any>;
    checkUser: (user: any) => Promise<"User is not exist" | "Password is wrong" | {
        token: any;
        idUser: any;
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
