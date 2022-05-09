import { Column, Entity, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm"
import { Project } from "./project.entity"
import { User } from "./user.entity"

@Entity()
export class Post {

    @PrimaryGeneratedColumn("increment", { type : "int" })
    id : number

    @Column("varchar", { length : 64 })
    title : string

    @Column("text")
    content : true

    @ManyToOne(type => User, user => user.id)
    author : User

    @ManyToOne(type => Project, project => project.id)
    project : Project
}