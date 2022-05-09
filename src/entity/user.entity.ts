import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm"
import { Project } from "./project.entity"

@Entity()
export class User {

    constructor(id: string, username : string, email : string) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
    
    @PrimaryColumn("varchar", { length : 16 , unique : true})
    id : string

    @Column("varchar", { length : 16 })
    username : string

    @PrimaryColumn("varchar", { length : 320 , unique : true})
    email : string
    
}