import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Connection, Repository } from "typeorm";
import { Post } from "./entity/post.entity";
import { Project } from "./entity/project.entity";
import { User } from "./entity/user.entity";

@Injectable()
export class DatabaseService {

    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
        @InjectRepository(Project) private projectRepository: Repository<Project>,
        @InjectRepository(Post) private postRepository: Repository<Post>,
        private connection: Connection
    ) {}

    async createUser(user: User) : Promise<boolean> {
        let isSuccess = true;
        
        const queryRunner = this.connection.createQueryRunner();
        
        await queryRunner.connect();
        await queryRunner.startTransaction();

        let findWithId = await queryRunner.manager.findOne(User, {
            where : {
                id : user.id
            }
        })

        let findWithEmail = await queryRunner.manager.findOne(User, {
            where : {
                email : user.email
            }
        })
        if (findWithId || findWithEmail) {
            queryRunner.release();
            return false
        }
        try {
            await queryRunner.manager.save(user);
            await queryRunner.commitTransaction();
        } catch (err) {
            console.log(err)
            await queryRunner.rollbackTransaction();
            isSuccess = false;
        } finally {
            await queryRunner.release();
            return isSuccess;
        }
    }

    
}