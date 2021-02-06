import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PermissisionModel, RoleModel } from '../../models';
import { RoleCreateDto, RoleUpdateDto } from '../../dtos';

@Injectable({
    providedIn: 'root'
})
export class RoleService {
    private url = environment.serverURL;

    constructor(private http: HttpClient) {
    }

    getAllRoles(): Observable<RoleModel> {
        return this.http.get<RoleModel>(`${this.url}/roles`);
    }

    getRoleById(roleId: string): Observable<RoleModel> {
        return this.http.get<RoleModel>(`${this.url}/roles/${roleId}`);
    }

    createRole(roleData: RoleCreateDto): Observable<RoleModel> {
        return this.http.post<RoleModel>(`${this.url}/roles`, roleData);
    }

    deleteRole(roleId: string): Observable<RoleModel> {
        return this.http.delete<RoleModel>(`${this.url}/roles/${roleId}`);
    }

    updatePermissionsOfRole(roleId: string, permission: PermissisionModel[]) {
        return this.http.put<RoleModel>(`${this.url}/roles/${roleId}/permission`, permission);
    }

    updateRole(roleId: string, roleData: RoleUpdateDto): Observable<RoleModel> {
        return this.http.put<RoleModel>(`${this.url}/roles/${roleId}`, RoleUpdateDto);
    }

}
