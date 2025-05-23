import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateRevenuDto {
  @IsOptional()
  @IsString()
  title?: string;

  @IsOptional()
  @IsNumber()
  amount?: number;

  @IsOptional()
  @IsString()
  type?: string;
}
