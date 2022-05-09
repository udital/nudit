import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from "@nestjs/config";
import { AppController } from './app.controller';
import { AppService } from './app.service';

import * as Joi from "joi";
import { DatabaseService } from './database.service';
import { User } from './entity/user.entity';
import { Project } from './entity/project.entity';
import { Post } from './entity/post.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal : true,
      envFilePath : process.env.NODE_ENV === "production" ? ".env.production" : ".env.development",
      validationSchema: Joi.object({
        DB_HOST : Joi.string().required(),
        DB_PORT : Joi.number().required(),
        DB_USERNAME : Joi.string().required(),
        DB_PASSWORD : Joi.string().required(),
        DB_NAME : Joi.string().required(),
      })
    }),
    TypeOrmModule.forRoot({
      type : 'mariadb',
      host : process.env.DB_HOST,
      port : 3306,
      username : process.env.DB_USERNAME,
      password : process.env.DB_PASSWORD,
      database : process.env.DB_NAME,
      entities : [__dirname + "/entities/*{.ts,.js}"],
      synchronize : true,
      autoLoadEntities : true,
      logging : true,
    }),
    TypeOrmModule.forFeature([User, Project, Post])
  ],
  controllers: [AppController],
  providers: [AppService, DatabaseService],
})
export class AppModule {}
