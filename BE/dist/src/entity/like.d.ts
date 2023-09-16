import { User } from "./user";
import { Status } from "./status";
export declare class Like {
    id: number;
    user: User;
    status: Status;
    isLiked: boolean;
    time: string;
}
