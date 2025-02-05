import { Injectable } from '@nestjs/common';
import { DbService } from 'src/db/db.service';
import { EditUserDto } from './dto';

@Injectable()
export class UserService {
    constructor(private dbService : DbService){

    }
    async editUser(userId : number, dto : EditUserDto){
        const user = await this.dbService.user.update({
            where: {
                userId : userId
            },
            data : {
                ...dto
            },
            select : {
                userId: true,
                email: true,
                firstName : true,
                lastName : true
            }
        })

        return user;
    }
}
