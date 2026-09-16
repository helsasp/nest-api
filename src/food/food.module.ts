import { Module } from '@nestjs/common';

import { FoodController } from './food.controller.js';
import { FoodService } from './food.service.js';
import { PrismaService } from '../prisma/prisma.service.js';
import { AuthModule } from '../auth/auth.module.js';

@Module({
  imports: [AuthModule],

  controllers: [FoodController],

  providers: [FoodService, PrismaService],
})
export class FoodModule {}