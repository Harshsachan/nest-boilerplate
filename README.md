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

Question 
 - what is ORM and type ORM
 - what is GRPAHQL
