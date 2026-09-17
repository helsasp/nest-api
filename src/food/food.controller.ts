import { Body, Controller, Post, Get, Delete, Patch, Param, Request, UseGuards } from '@nestjs/common';
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

@UseGuards(JwtAuthGuard)
@Delete(':id')
delete(
  @Param('id') id: string,
  @Request() req: any,
) {
  return this.foodService.delete(Number(id), req.user.userId);
}   

@UseGuards(JwtAuthGuard)
@Patch(':id')
update(
  @Param('id') id: string,
  @Body()
  body: {
    name?: string;
    description?: string;
    price?: number;
    category?: string;
  },
  @Request() req: any,
) {
  return this.foodService.update(Number(id), body, req.user.userId);  

}
}

