import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

// module decorator below
@Module({
    controllers : [AuthController],
    providers :[AuthService],
})

// we need to export this class otherwise it will only be availble in this module
export class AuthModule {}
