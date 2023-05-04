import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@Controller('users')
export class UserController {
    // Using guards to protect our routes
    @UseGuards(AuthGuard('token_received'))
    // (../users/me)
    @Get('me')
    getMe(@Req() req: Request){
        // console.log({
        //      user: req.user
        //     });
        console.log(req.user)
        return req.user
    }
}
