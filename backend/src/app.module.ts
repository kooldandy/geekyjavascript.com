import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './modules/database/database.module';
import { BlogsModule } from './modules/blog/blog.module';
// import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [DatabaseModule, BlogsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
