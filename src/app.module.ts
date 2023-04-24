import { Module } from '@nestjs/common';


// @Module Decorator - it is a function which adds a metadata to the class or function it is decorating

/*
 - A module can import other modules
 - 
*/

@Module({
  imports: [],
})
export class AppModule {}
