import { IsNotEmpty, IsString, IsInt, IsNumber, IsBoolean, IsArray } from 'class-validator';

export class OrderCreateDto {
  @IsNotEmpty()
  @IsString()
  shippingAddress: string;

  @IsNotEmpty()
  @IsString()
  city: string;

  @IsString()
  zip?: string;

  @IsString()
  phoneNumber?: string;

  @IsArray()
  orderItems?: OrderItemDataDto[];
}


class OrderItemDataDto {
  @IsString()
  productId: string;

  @IsInt()
  quantity: number;
}