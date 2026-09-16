import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service.js';

@Injectable()
export class FoodService {
  constructor(private readonly prisma: PrismaService) {}

  async create(
    data: {
      name: string;
      description?: string;
      price: number;
      category: string;
    },
    userId: number,
  ) {
    return this.prisma.food.create({

        name: data.name,
        description: data.description,
        price: data.price,
        category: data.category,
        userId,
    });
  }

  async findAll(userId: number) {
  return this.prisma.food
    .where({
      userId,
    })
    .all();
}
}

