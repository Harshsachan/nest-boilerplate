## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Installation

```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

/* tutorial 

 - We divide our project in differnt logic part like auth , User, Bookmark module
 - We can create by our own or by using command ( nest g module module_name ) it will automatically genarte the module's and import in app.module.ts

*/


/* app.module.ts 
   
   - it conatins all the modules in the import section of the module decorator

*/

/* Adding Logic

  - While building application in nestjs we seprate our logic in controller's and service

  - Controller's - Controllers are responsible handling handling request & providing responses for the client they can be added by hand(we need to handle import and export carefully)  or by using cli () @Controllable decorator is used.
 
  - Service (Providers) - They are responsible for implementing business logic they can be added by hand(we need to handle import and export carefully)  or by using cli () @Injectable decorator is used .

  - For example if a user is trying to login then the request comes in the controller it ask the service to fulfill and implement that logic of request

*/

2- DATABASE CONNECTION

/* Setting Database
   Docker - It helps run database in our computer without installing it our desktop
   After setting up docker-compose.yml file we have our database running in our docker 
  
  NOW How to access them ?
  - There are libraries like (SQLI , TYPEORM , MONGOOSE ) that allow us to connect to the database
  -  We are using a new ORM called PRISMA 

  PRISMA - in a nutshell it is an querybuilder so easy to use , so basically we define a model and then we can get it by our javascript and typescript syntax 

  For Prisma we have to have 2 library installed 1- prsima CLI(Run schema , maintainence ,run migration , deploy migrstion ) 2-Prisma Client 
  after installing run (npx prisma init) 
  - It generate a .env file which will have database_url which we can change 
  - It will create a prisma folder which will have a schema.prisma file where we will declare our model 
    if we use typeorm we have to define our model in different specific file in prisma we need not to do that
  PRISMA has many providers we can use any provider like mysql , mongodb

*/

/* Creating model

  - We create datamodel in scghema.prisma by (model) decorator datatypes n everything can be refered in prisma site .
  - Thwn we need to connect our database connection String to database_url ( set user,password,db_name,port) in database_url
  - Then run (npx prisma migrate dev) it will create migration and sql query 
  - then run (npx prisma generate) it creates typescript types on your schema it creates interfaace of schema classes we can directly use them in our code.
  - Then run (npx prisma studio) it will open a studio in our browser we can view,add our schema and data in browser 

*/

/* Connecting database model

  - we have created a prisma folder for setting up datbase now to connect database to our schema we need to run this command (nest g module prisma)  it will create a prisma module then we will create prisma service class (nest g service prisma --no-spec) which extends the prismaclient (it allow to connect to database it has constructor which has methods like $connect,$disconnect,$exectuesql)
  - We need to pass 
      constructor()
    {
        super({
            datasources:{
                db:{
                    url:'your_env_db_url'
                }
            }
        })
    }
    to connect our database so that other module can use our db

*/

/* Logic Writing

  Receving Data like email , password via url (request)- Next has a lot of decorator  we can use express js under the hood we can receive data by using (request) method provided by express 
  ( @Post('signup')signup(@Req() req:request){console.log(req)} ) req has many methods like body , header and various things so that we can receive data.

  This method of accessing the data (Request method provided by express) is not that clean Nest provide a DTO 

  DTO - it is an object which pushes data from a request and we can define our object like it should have an email , password or whatever we like. To use dto we use @Body decorator like 
  (signup(@Body() dto:(ObjectStructure_which we_define_in_our_dtoclass))) .

  Shape of Dto class - We can define our all dto in a seprate dto file and export that though index.ts file .We create class of our required Dto and then export it see (src/auth/dto) Barren export method
  
  Validation of correct email and password - What if email is not given by user or validation is not done by them then we have to include a lot of if and else statement we can use class transformer and class validator to acheive this fumctionality 

  Pipes - Pipes are just function which transform your data .if we have a string "1" but we have to use 1 as a number then to deal with it pipe's come in handy pipes has two use cases : 
  1- transformation :transform input data to the desired form (e.g., from string to integer) 
  2- validation: evaluate input data and if valid, simply pass it through unchanged; otherwise, throw an exception
  (npm i --save class-validator class-transformer) use this cmd to install class validator and decorator then
  we go to our dto file and add @IsNotEmpty @IsEmail .... to check whether the input format is correct or not then we tell main.ts file that we are using pipes by adding (app.useGlobalPipes(new ValidationPipe())) just before app.listen(3000)
  WHAT IF SOMEONE HAS FOUND A VULNARBILITY AND THEY TRY TO INJECT A VARIABLE ? 
  - just add  whiteList:true in app.useGlobalPipes(new ValidationPipe({whitelist:true}) and it will strip out all the unwanted variable

// Now we can run our business logic assuring that the data received is correct

  HASHING OF PASSWORD (AARGON)
  we can install aargon2 a library which convert a string to hash then we can write logic of signup

// Generate password hash
                const hash =await argon.hash(dto.password)
        
// Save the new user in the db
                const user = await this.prisma.user.create({
                        data:{
                               email:dto.email,
                               hash,
                              },
                        });
        
// return the saved user
            return user;

// Now the user will be created but the problem is that every type that particular user comes a new user will be created beacuse we did'nt set our email as unique in prisma migration read prisma for query typing.
   
   - if we try to create a user with that particular mail it will give us the error now we have to deal with that error by using try catch block in our logic code (auth.service.ts)

   - Then we create a signin funtionality with password matching and then catching all the sign in edge cases. 


*/

/*

  We see that every time we run prisma migrate dev it creates a new migration so we will create a script that will apply pending migration to the database by using "prisma migrate deploy"

*/

/* Config module

 This helps in creating .env file (yarn add @nestjs/config)
 - Import Configmodule in app.module.js so that .env file can be used by all module availble in our project.
 - We can't expose our database url string to our project that's why we use config module first we add config module to our project by adding cmd command then we import in app.module.js so that we can use in our whole project by adding ( ConfigModule.forRoot({isGlobal: true}) ) in import section of app.module.
 - Then we add configService in pisma.service class so that we can use varaible to establish connection using config.get() function
  - learn .env from yt

*/


// AUTHERISATION

/* Allow server to track the user  
  There are two ways to do that :- 
    1- SESSION -
    2- JWT (JSON WEB TOKEN) - 
There are some routes like user/me which only be allowed to some user who are autheticated so thats why we are using Autehrisation
Nest js has many already made module like any npm library

Autherisation - We are doing autherisation using (PASSPORT.JS)
We need to install few package - 
1- yarn add @nestjs/passport passport 
2- yarn add @nestjs/jwt passport-jwt
3- yarn add -D  @types/passport-jwt (for typescript)

Everything installed will be used in auth module nd service 

Authorisation logic 
- First we create a async-function signtoken which will create a signtoken with (email ,userId) it will create payload ( const payload = {sub: userId,email,}; ) sub is important for passport.js then we will create a keyword named secret which will help in creating a string and then we will create a token using payload and the secert keyword then we will return a accesstoken object 
-------------------------------------------------------------
async signToken(
    userId: number,
    email: string
  ):Promise<{access_token:string}> 
  {
    const payload = {
      sub: userId,
      email,
    };
    const secert= this.config.get('JWT_SECRET')
    const token= await this.jwt.signAsync(payload,{secret:secert})
    return{
          access_token:token,
    };
  }
-------------------------------------------------------------


*/


/* Strategy
    Varyfying the access token is called Strategy
    - We create a new folder named Strategy which will hold our startegy for different types of login like (facebook login , google login ....)
    -Strategy folder containes a index.ts file which will export all the strategy that we create 
    - jwt.strategy.js file contain the logic for checking the token then we import it in authmodule providers/services.
    -------------------------------------------
    export class JwtStrategy extends PassportStrategy(Strategy)
      {
          constructor(config: ConfigService)
          {
              super({ 
                  jwtFromRequest :ExtractJwt.fromAuthHeaderAsBearerToken(),
                  secretOrKey :config.get('JWT_SECRET'),
              });
          }
      }
    -------------------------------------------

*/

/* Nestjs Guards 
   To protect our routes through some condition we use guards Guards have a single responsibility. They determine whether a given request will be handled by the route handler or not, depending on certain conditions (like permissions, roles, ACLs, etc.) present at run-time.

  - we can create our own routes but in this case we will make routes which are already made n present in the library.

  we will create a route with @Get/post method and before declaring its method we will add 
   @UseGuards(AuthGuard('token_received')) 
  token_received - the token name which will get from jwt strategy
  then we will create a method that will receive request as an argument and that request will hold the request as an object (getMe(@Req() req: Request)) at req.user..
  
  - we can give data through validate(payload:any) but that will not consist of whole data we need to get data from prisma for doing that 


*/


/* Enhancment-  
    Varioius method can be done to enchanse our request object (@Req() req: Request).

*/

/* @HttpCode - decorator 
*/













Question 


 - what is ORM and type ORM
 - what is GRPAHQL
