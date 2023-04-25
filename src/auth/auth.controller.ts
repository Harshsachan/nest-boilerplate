import { Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";


// Global route ..../auth
@Controller('auth')
export class AuthController{
    // Intenciate the service class in controller (to  call any method present in service class) we use 
    // dependecy injection for that 
    /*
      private keyword - 
      if we dont want to use private keyword we have to use this keyword instead like 

      authService = AuthServise
      constructor( authService : AuthService){
        this.authService= authService
      }

      // calling test function from AuthService class
        this.authService.test



    */

    constructor(private authService : AuthService){}
        // creating end point
        // ..../auth/signup

        @Post('signup')
        signup(){
            
            // using function created in service class 
            return this.authService.signup()
        }
        @Post('signin')
        signin(){

            // using function created in service class 
            return this.authService.signin()
        }
    
}