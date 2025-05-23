import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateRevenuDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsNumber()
  amount: number;

  @IsString()
  type: string;
}
