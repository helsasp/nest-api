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

async delete(id: number, userId: number) {
  const food = await this.prisma.food
    .where({
      id,
      userId,
    })
    .first();

  if (!food) {
    throw new Error('Food not found or you do not have permission to delete it');
  }

  return this.prisma.food
    .where({
      id,
    })
    .delete();
}

async update (
  id: number,
  data: {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
  },
  userId: number,
) {
  const food = await this.prisma.food
    .where({
      id,
      userId,
    })
    .first();

  if (!food) {
    throw new Error('Food not found or you do not have permission to update it');
  }

  return this.prisma.food
    .where({
      id,
    })
    .update(data);  

  }
}

