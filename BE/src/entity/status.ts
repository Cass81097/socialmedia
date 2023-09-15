import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany} from "typeorm";
import {User} from "./user";
import {Like} from "./like";
import Image from "./image";


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
    // Định nghĩa quan hệ OneToMany với bảng Like
    @OneToMany(() => Like, (like) => like.id, { onDelete: 'CASCADE' })
    likes: Like[];

    @OneToMany(() => Image, (img) => img.id, { onDelete: 'CASCADE' })
    images: Image[];

}