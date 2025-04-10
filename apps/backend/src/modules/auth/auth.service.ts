/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ){}

    login(user: any){
        const payload = { email: user.email, sub: user.id };
        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    async validateUser(email: string, password: string): Promise<any>{
        const user = await this.usersService.findOne('email', email);
        console.log(user);
        
        if(user && (await user.comparePassword(password))){
            const { password, ...result } = user;
            return result;
        }
        return null
    }
}
