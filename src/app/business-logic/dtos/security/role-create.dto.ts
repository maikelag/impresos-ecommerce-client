import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { PermissisionModel } from '../../models';

export class RoleCreateDto {
    @IsNotEmpty()
    @IsString()
    role: string;
  
    @IsArray()
    permissions: PermissisionModel[];
}

