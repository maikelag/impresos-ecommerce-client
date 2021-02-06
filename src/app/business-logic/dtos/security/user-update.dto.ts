import { IsNotEmpty, IsArray, IsAlphanumeric, IsString, IsEmail } from 'class-validator';

export class UserUpdateDto {
  @IsString()
  name?: string;

  @IsString()
  lastName?: string;
}
