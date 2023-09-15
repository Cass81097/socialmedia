import {Column, Entity, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";

@Entity()
export class Status {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'varchar' })
    namePost: string;


    @Column({type : "longtext"})
    content: string;

    @Column({ default: "public" }) // Mặc định là public
    visibility: string;

    @Column({type: "varchar"})
    image : string

    @ManyToOne(() => User, (user) => user.id)
    user: User;

}