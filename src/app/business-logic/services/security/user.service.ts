import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { Observable } from 'rxjs';
import { PermissisionModel, RoleModel, UserModel } from '../../models';
import { UserAuthDTO, UserChangePasswordDTO } from '../../dtos';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = environment.serverURL;

    constructor(private http: HttpClient) {
    }

    getAllUsers(): Observable<UserModel> {
        return this.http.get<UserModel>(`${this.url}/users`);
    }

    getUserById(userId: string): Observable<UserModel> {
        return this.http.get<UserModel>(`${this.url}/users/${userId}`);
    }

    whoIAm() {
        return this.http.get<UserModel>(`${this.url}/users/who-i-am`);
    }

    deleteUser(userId: string): Observable<UserModel> {
        return this.http.delete<UserModel>(`${this.url}/users/${userId}`);
    }

    login(authData: UserAuthDTO) {
        return this.http.post(`${this.url}/users/login`, authData)
    }

    changePassword(authData: UserChangePasswordDTO): Observable<UserModel> {
        return this.http.post<UserModel>(`${this.url}/users/password`, authData)
    }

    editRolesOfUser(userId: string, roles: RoleModel[]) {
        return this.http.put(`${this.url}/users/${userId}/roles`, roles)
    }
}
