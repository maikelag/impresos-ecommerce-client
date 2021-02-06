import { IsNotEmpty, IsString, IsArray } from 'class-validator';
import { PermissisionModel } from '../../models';
export class RoleUpdateDto {
    @IsNotEmpty()
    @IsString()
    role: string;
  
    @IsArray()
    permissions: PermissisionModel[];
}

