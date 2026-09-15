import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);

    return this.prisma.client.orm.public.User.create({
      email,
      password: hashedPassword,
    });
  }

  async login(email: string, password: string) {
  const user = await this.prisma.client.orm.public.User
    .where({ email })
    .first();

  if (!user) {
    throw new Error('Email atau password salah');
  }

  const passwordMatch = await bcrypt.compare(
    password,
    user.password,
  );

  if (!passwordMatch) {
    throw new Error('Email atau password salah');
  }

  const accessToken = await this.jwtService.signAsync({
    sub: user.id,
    email: user.email,
  });

  return {
    access_token: accessToken,
  };
}
}