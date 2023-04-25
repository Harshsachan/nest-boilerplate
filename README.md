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

