import { User } from "./user";
import { Like } from "./like";
import ImageStatus from "./imageStatus";
export declare class Status {
    id: number;
    content: string;
    visibility: string;
    sender: User;
    receiver: User;
    time: Date;
    likes: Like[];
    images: ImageStatus[];
}
