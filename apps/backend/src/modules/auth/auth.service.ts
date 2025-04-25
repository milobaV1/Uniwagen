/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private readonly mailService: MailerService,
  ) {}

  login(user: any) {
    const payload = { email: user.email, sub: { id: user.id } };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOne('email', email);
    console.log(user);

    if (user && (await user.comparePassword(password))) {
      const { password, ...result } = user;
      await this.mailService.sendMail({
        from: process.env.MAIL_FROM,
        to: result.email,
        subject: 'Login Notification',
        text: `Hello ${result.firstName}, you have successfully logged in!`,
      });

      return result;
    }
    return null;
  }
}
