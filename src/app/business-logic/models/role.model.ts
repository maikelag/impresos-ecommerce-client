import { PermissisionModel } from "./permission.model";

export class RoleModel {
    id: string;
    role: string;
    permissions?: PermissisionModel[]
}