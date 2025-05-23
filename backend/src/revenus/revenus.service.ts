import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Revenu } from "./entities/revenu.entity";
import { Repository } from "typeorm";

@Injectable()
export class RevenusService {
  constructor(
    @InjectRepository(Revenu)
    private revenusRepository: Repository<Revenu>,
  ) {}

  async tousLesRevenus(): Promise<Revenu[]> {
    return this.revenusRepository.find();
  }

  async create(revenuData: Partial<Revenu>): Promise<Revenu> {
    const revenu = this.revenusRepository.create(revenuData);
    return this.revenusRepository.save(revenu);
  }

  async update(id: number, revenuData: Partial<Revenu>): Promise<Revenu> {
    await this.revenusRepository.update(id, revenuData);
    const revenu = await this.revenusRepository.findOneBy({ id });
    if (!revenu) {
      throw new Error(`Revenu with id ${id} not found`);
    }
    return revenu;
  }

  async remove(id: number): Promise<void> {
    await this.revenusRepository.delete(id);
  }
}
