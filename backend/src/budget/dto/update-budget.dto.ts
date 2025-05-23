import { IsString, IsNumber, IsOptional, IsIn } from 'class-validator';

export class UpdateBudgetDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  @IsIn(['expense', 'revenu']) // Optionnel : pour vérifier que le type est valide
  type?: string;
}
