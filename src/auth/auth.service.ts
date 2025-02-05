import { ForbiddenException, Injectable } from "@nestjs/common";
import { DbService } from "src/db/db.service";
import { AuthDto, LoginDto } from "./dto";
import * as argon from "argon2";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable ({})

export class AuthService {
    constructor(private dbService : DbService, private jwt : JwtService, private config : ConfigService){
    }
    test(){
        return "Testing";
    }

    async singup(dto : AuthDto){
        //hash password
        const hash = await argon.hash(dto.password);
        //save values
        try {
            const user = await this.dbService.user.create({
                data : {
                    email : dto.email,
                    hash,
                    firstName : dto.firstName,
                    lastName : dto.lastName
                }
            });
            //return saved user
            return this.signToken(user.userId, user.email)
        }catch (error){
            if(error instanceof PrismaClientKnownRequestError){
                if(error.code === "P2002"){
                    throw new ForbiddenException('Email already registred');
                }
            }
            throw error;
        }
    }

    async signin(dto: LoginDto){
        const user = await this.dbService.user.findUnique({
            where: {
                email : dto.email
            }
        });
        if (!user){
            throw new ForbiddenException('User does not exist');
        };

        const pwMatch = await argon.verify(user.hash, dto.password);

        if(!pwMatch){
            throw new ForbiddenException('Password does not match');
        };

        return this.signToken(user.userId, user.email)
    }

    async signToken(userId : number, email : string) : Promise<object>{
        const payload = {
            sub : userId,
            email
        }
        const secret = this.config.get('JWT_SECRET');

        const token = await this.jwt.signAsync(payload, {
            expiresIn: '15m',
            secret : secret
        });

        return {
            access_token : token
        }
    }
}