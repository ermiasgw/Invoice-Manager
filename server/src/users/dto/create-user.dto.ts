import { Prisma, Role } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsStrongPassword } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsNotEmpty()
  name: string;

  @IsStrongPassword({
    minLength: 8,
    minLowercase: 0,
    minUppercase: 0,
    minNumbers: 0,
    minSymbols: 0,
  })
  password: string;

  @IsEnum(Role)
  @IsOptional()
  role: Role
}

