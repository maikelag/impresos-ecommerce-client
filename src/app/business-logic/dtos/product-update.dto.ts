import { IsString, IsInt, IsNumber, IsBoolean, IsArray } from 'class-validator';
import { CategoryModel } from '../models';

export class ProductUpdateDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsInt()
  amount?: number;

  @IsNumber()
  priceSale?: number;

  @IsNumber()
  cost?: number;

  @IsBoolean()
  isOnSale?: boolean;

  @IsArray()
  categories?: CategoryModel[];

  @IsString()
  image?: string;
}

