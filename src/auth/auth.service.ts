import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from "@prisma/client/runtime";
import {  Prisma } from '@prisma/client'


@Injectable({})
export class AuthService{
    constructor(private prisma:PrismaService){

    }
    async signup(dto:AuthDto){        
        // Generate password hash
                const hash =await argon.hash(dto.password)
        
                // Save the new user in the db
                try{
                        const user = await this.prisma.user.create({
                                data: {
                                        email:dto.email,
                                        hash,
                                        },
                                        });
                                        delete user.hash
                        // return the saved user
                                return {msg:"user created successfully"}
                }
                catch(error)

                {

                        if(error instanceof Prisma.PrismaClientKnownRequestError)
                        {
                                
                                if(error.code === 'P2002')
                                {
                                        throw new ForbiddenException('Credentials taken',);
                                        
                                }
                        }
                        throw error;
                }
        
        
        
    }
    signin(){
            return { masg : 'I have signed in'}
    }
}