import {Column, Entity, ManyToOne, PrimaryGeneratedColumn,OneToMany} from "typeorm";
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

    @ManyToOne(() => User, (user) => user.id)
    user: User;
    @Column()
    time : string

}