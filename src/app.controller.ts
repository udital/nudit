import { Body, Controller, Get, HttpCode, HttpException, HttpStatus, Post, Res } from '@nestjs/common';
import { response } from 'express';
import { AppService } from './app.service';
import { DatabaseService } from './database.service';
import { User } from './entity/user.entity';
import { Response } from 'express'

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private readonly dbService: DatabaseService) {}

  

  @Get()
  getHello() : string {
      return "Hello"
  }

  @Post("/user")
  async postUser(@Body() user: User) {
    let result = await this.dbService.createUser(new User(user.id, user.username, user.email))
    console.log(result)
    if (result) {
        throw new HttpException("Created user successfully", 201)
    } else {
        throw new HttpException("Cannot create new instance of user", 400)
    }
  }

}