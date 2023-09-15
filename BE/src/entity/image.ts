import {Column, ManyToOne, PrimaryGeneratedColumn} from "typeorm";
import {User} from "./user";
import {Status} from "./status";

export default class Image{
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type: "varchar"})
    image : string
    @ManyToOne(() => Status, (status) => status.id)
    status: Status;
 }