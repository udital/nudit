import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type : 'mariadb',
      host : 'ssh.cube.dev',
      port : 3306,
      username : 'cube',
      password : 'pqvC_5Nd7=mc@^U+MM-*',
      
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
