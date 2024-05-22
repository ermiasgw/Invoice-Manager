import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(
        private prisma: DatabaseService,
        private jwtService: JwtService
    ) {}

    async validateUser(email: string, pass: string): Promise<any> {
        const user = await this.prisma.user.findFirst({
            where: {
                email: email
            }
        });
        if (user && await bcrypt.compare(pass, user?.password)) {
            const { password, ...result } = user;
            return result;
          }
        
        return null;
        
      }

    async login(user: any) {
        const payload = { email: user.email, sub: user.id };
        return {
            user: user,
            access_token: this.jwtService.sign(payload),
        };
    }
}
