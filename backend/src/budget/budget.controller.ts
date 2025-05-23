import { Controller, Post, Body, Get, Param, Put } from '@nestjs/common';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { BudgetService } from './budget.service';
import { Budget } from './entities/budget.entity';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budgets')
export class BudgetController {
  constructor(private readonly budgetService: BudgetService) {}

  @Post()
async create(@Body() dto: CreateBudgetDto): Promise<Budget> {
  return this.budgetService.create(dto);
}

@Put(':id')
async update(
  @Param('id') id: number,
  @Body() dto: UpdateBudgetDto,
): Promise<Budget> {
  return this.budgetService.update(id, dto);
}

  @Get()
  findAll() {
    return this.budgetService.findAll();
  }
}
