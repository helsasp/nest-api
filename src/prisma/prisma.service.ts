import { Injectable } from '@nestjs/common';
import { db } from './db.js';

@Injectable()
export class PrismaService {
  client = db;
    food = db.orm.public.Food;
    user = db.orm.public.User;
}