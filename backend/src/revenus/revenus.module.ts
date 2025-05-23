import { Module } from '@nestjs/common';
import { RevenusService } from './revenus.service';
import { RevenusController } from './revenus.controller';
import { Revenu } from './entities/revenu.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Revenu])],
  controllers: [RevenusController],
  providers: [RevenusService],
})
export class RevenusModule {}
