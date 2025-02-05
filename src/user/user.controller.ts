import { Body, Controller, Get, Patch, Req, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser } from 'src/auth/decorator';
import { JwtGuard } from 'src/auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard)
@Controller('users')
export class UserController {
    constructor(private userService : UserService){}
    @Get('me')
    getMe(@GetUser('') user : User) {
        return user;
    }

    @Patch('edit')
    editUser(@GetUser('') user: User, @Body() dto : EditUserDto){
        return this.userService.editUser(user.userId, dto);
    }
}
