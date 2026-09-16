import { Body, Controller, Post, Get, Request, UseGuards } from '@nestjs/common';
import { FoodService } from './food.service.js';
import { JwtAuthGuard } from '../auth/jwt-auth.guard.js';

@Controller('foods')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  create(
    @Body()
    body: {
      name: string;
      description?: string;
      price: number;
      category: string;
    },
    @Request() req: any,
  ) {
    return this.foodService.create(body, req.user.userId);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Request() req: any) {
    return this.foodService.findAll(req.user.userId);
  }
  
}
