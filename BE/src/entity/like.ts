import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";
import {Status} from "./status";


@Entity()
export class Like {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.id)
    user: User;

    @ManyToOne(() => Status, (post) => post.id)
    status: Status;
    @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
    time: Date;

}