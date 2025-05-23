import { IsString, IsNumber, IsIn } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  title: string;

  @IsNumber()
  amount: number;

  @IsString()
  @IsIn(['expense', 'revenu']) // optionnel : pour valider le type
  type: string;
}
