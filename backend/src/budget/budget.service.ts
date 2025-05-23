// src/budget/budget.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Budget } from './entities/budget.entity';

@Injectable()
export class BudgetService {
  constructor(
    @InjectRepository(Budget)
    private budgetRepository: Repository<Budget>,
  ) {}

  async findAll(): Promise<Budget[]> {
    return this.budgetRepository.find();
  }

  async create(budgetData: Partial<Budget>): Promise<Budget> {
    const budget = this.budgetRepository.create(budgetData);
    return this.budgetRepository.save(budget);
  }

  async update(id: number, budgetData: Partial<Budget>): Promise<Budget> {
    await this.budgetRepository.update(id, budgetData);
    const budget = await this.budgetRepository.findOneBy({ id });
    if (!budget) {
      throw new Error(`Budget with id ${id} not found`);
    }
    return budget;
  }

  async remove(id: number): Promise<void> {
    await this.budgetRepository.delete(id);
  }
}
