import { Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';
import { Public } from './auth.decorator';
import { User } from '../users/user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    
    @UseGuards(LocalAuthGuard)
    @Public()
    @Post('login')
    async login(@User() user) {
        return this.authService.login(user);
      }
}
