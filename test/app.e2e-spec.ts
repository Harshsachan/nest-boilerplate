import { INestApplication, ValidationPipe } from "@nestjs/common";
import { Test } from "@nestjs/testing";
// import { describe } from "node:test";
import { AppModule } from "../src/app.module";


describe('App e2e',()=>{
  let app:INestApplication;
  beforeAll(async()=>{
    const moduleRef = await Test.createTestingModule({
      imports:[AppModule],
    }).compile();

  app = moduleRef.createNestApplication();
    // We are simulating our app so what ever we are using in our app (main.ts) should also be specified here like GLobalPipes 
  // if we don't specify dto verification will not work
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.init();
});

afterAll(()=>{
  app.close();
})

  it.todo('should pass');
});