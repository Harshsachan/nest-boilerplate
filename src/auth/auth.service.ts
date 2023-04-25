import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService{
    signup(){
            return { msg: 'I have signed up'}
    }
    signin(){
            return { masg : 'I have signed in'}
    }
}