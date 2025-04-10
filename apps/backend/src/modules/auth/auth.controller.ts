/* eslint-disable prettier/prettier */
import { Controller, Post, UseGuards, Request } from '@nestjs/common';
import { ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @UseGuards(LocalAuthGuard)
    @Post('login')
    @ApiOperation({ summary: 'Login to get a JWT token' })
    @ApiBody({ schema: { example: { email: 'user@example.com', password: 'password123' } } }) // Example request body
    @ApiResponse({ status: 201, description: 'Login successful, returns a JWT token' })
    @ApiResponse({ status: 401, description: 'Unauthorized' })
    async login(@Request() req) {
      return this.authService.login(req.user);
    }
}
