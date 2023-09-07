import {Column, Entity, PrimaryGeneratedColumn,ManyToOne} from "typeorm";
import {User} from "./user";

@Entity()
export class FriendShip {
    @PrimaryGeneratedColumn()
    id: number;
    @ManyToOne(()=>User,(user)=>user.id)
    user1_id: User;
    @ManyToOne(()=>User,(user)=>user.id)
    user2_id: User;
    @Column({ type: 'varchar' })
    status: string
}
