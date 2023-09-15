import { User } from "./user";
import { Like } from "./like";
import Image from "./image";
export declare class Status {
    id: number;
    namePost: string;
    content: string;
    visibility: string;
    user: User;
    time: string;
    likes: Like[];
    images: Image[];
}
