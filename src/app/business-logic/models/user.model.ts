import { RoleModel } from "./role.model";

export class UserModel {
    id: string;
    email: string;
    username: string;
    name: string;
    lastName: string;
    password: string;
    createdAt: Date;
    updateAt: Date;
    roles?: RoleModel[];

}
