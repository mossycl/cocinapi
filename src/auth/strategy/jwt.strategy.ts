import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { DbService } from "src/db/db.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,'jwt'){
    constructor(config : ConfigService, private dbService : DbService){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey : config.get('JWT_SECRET') as string,
        });
    }

    async validate(payload: {sub : number, email : string}){
        const user = await this.dbService.user.findUnique({
            where: {
                userId : payload.sub
            },
            select: {
                userId: true,
                email : true,
                firstName : true,
                lastName : true,
                createdAt : true,
                updatedAt : true
            }
        })
        return user;
    }
}