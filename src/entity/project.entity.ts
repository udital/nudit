import { Column, Entity, PrimaryColumn, ManyToOne } from "typeorm"
import { User } from "./user.entity"

@Entity()
export class Project {

    @PrimaryColumn("varchar", { length : 16 })
    id : string;

    @ManyToOne(type => User, user => user.id)
    administrator : User;
}