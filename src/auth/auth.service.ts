import {
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Prisma } from "@prisma/client";
import { AuthDto } from "./dto";
import * as argon from "argon2";
import { PrismaService } from "src/prisma/prisma.service";
import { ConfigService } from "@nestjs/config";

@Injectable({})
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService
  ) {}
  async signup(dto: AuthDto) {
    // Generate password hash
    const hash = await argon.hash(
      dto.password
    );

    // Save the new user in the db
    try {
      const user =
        await this.prisma.user.create({
          data: {
            email: dto.email,
            hash,
          },
        });
      // return the saved user
      // return {
      //   msg: "user created successfully",
      // };
      // returning the token
      return this.signToken(user.id,user.email);
    } catch (error) {
      // catch the error if the user is already is present with that email
      if (
        error instanceof
        Prisma.PrismaClientKnownRequestError
      ) {
        if (error.code === "P2002") {
          throw new ForbiddenException(
            "Credentials taken"
          );
        }
      }
      throw error;
    }
  }

  // Sign in

  async signin(dto: AuthDto) {
    //Find the user by email
    const user =
      await this.prisma.user.findUnique(
        {
          where: {
            email: dto.email,
          },
        }
      );
    // If user does not exist throw an exception
    if (!user)
      throw new ForbiddenException(
        "Email not found plz signup first"
      );
    // match the password
    const passMatches =
      await argon.verify(
        user.hash,
        dto.password
      );

    // If password does not match throw an exception
    if (!passMatches)
      throw new ForbiddenException(
        "Password incorrect plz Enter the correct password"
      );

    // return JWT TOKEN
    
    //return ({msg:"Hi Signed in",data:this.signToken(user.id,user.email)});
        return this.signToken(user.id,user.email);
  }
  // creating a token
   async signToken(
    userId: number,
    email: string
  ):Promise<{access_token:string}> {
    const payload = {
      sub: userId,
      email,
    };


    const secert= this.config.get('JWT_SECRET')
    const token= await this.jwt.signAsync(payload,{secret:secert})
    return{
        access_token:token,
    };
//     return this.jwt.signAsync(payload, {
//         // secert should not be exposed in github so we will write in .env file
//         secret: secert,
//       });
  }
}
