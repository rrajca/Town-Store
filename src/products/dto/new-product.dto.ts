import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
} from 'class-validator';

export class NewProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber({ maxDecimalPlaces: 2 })
  @IsPositive()
  @IsNotEmpty()
  price: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsOptional()
  stock?: number;

  @IsUrl({ require_protocol: true })
  image: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @IsNotEmpty()
  categoryId: number;

  @IsString()
  @IsOptional()
  description?: string;
}
