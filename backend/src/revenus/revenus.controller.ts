import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { RevenusService } from "./revenus.service";
import { Revenu } from "./entities/revenu.entity";
import { CreateRevenuDto } from "./dto/create-revenu.dto";
import { UpdateRevenuDto } from "./dto/update-revenu.dto";

@Controller('revenus')
export class RevenusController{
  constructor(private readonly revenusService: RevenusService) {}

  @Get()
  async findAll(): Promise<Revenu[]> {
    return  this.revenusService.tousLesRevenus();
  }

 @Post()
async create(@Body() dto: CreateRevenuDto): Promise<Revenu> {
  return this.revenusService.create(dto);
}

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.revenusService.remove(id);
  }

  @Put(':id')
async update(
  @Param('id') id: number,
  @Body() dto: UpdateRevenuDto,
): Promise<Revenu> {
  return this.revenusService.update(id, dto);
}
}