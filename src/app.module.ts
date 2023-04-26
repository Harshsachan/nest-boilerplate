import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookmarkModule } from './bookmark/bookmark.module';
import { PrismaModule } from './prisma/prisma.module';


// @Module Decorator - it is a function which adds a metadata to the class or function it is decorating

/*
 - A module can import other modules
 - We need to import all the module's here so that we can use it everywhere in the project
*/

@Module({
  imports: [AuthModule, UserModule, BookmarkModule,PrismaModule],
})
export class AppModule {}
