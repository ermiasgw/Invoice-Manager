import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { DatabaseService } from '../database/database.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: DatabaseService) {}

  async create(data: Prisma.UserCreateInput) {
    // check if email exists
    const emailExists = await this.emailExists(data.email);
    if (emailExists) {
      throw new BadRequestException('Email address is already in use');
    }
    data['password'] = await bcrypt.hash(data.password, 10);
    return this.prisma.user.create({
      data,
    });
  }

  async findAll() {
    return this.prisma.user.findMany();
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: {
        id,
      },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    };

    return user
  }

  async update(id: number, data: Prisma.UserUpdateInput) {
    // fetch user
    const user = await this.findOne(id)

    const email = String(data.email) ?? null;
    
    // check if email is changed
    if (email && email !== user.email){
      const emailExists = await this.emailExists(email);
      if (emailExists) {
        throw new BadRequestException('Email address is already in use');
      }
    };

    return this.prisma.user.update({
      where: {
        id,
      },
      data,
    })
  
  }

  async remove(id: number) {

    const user = await this.findOne(id)

    return this.prisma.user.delete({
      where: {
        id,
      }
    })
  }

  private async emailExists(email: string): Promise<boolean> {
    // check if email is unique
    const existingUser = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });
    return !!existingUser;
  }
}
