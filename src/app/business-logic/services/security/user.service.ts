import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { PermissisionModel, RoleModel, UserModel } from '../../models';
import { UserAuthDTO, UserChangePasswordDTO } from '../../dtos';
import { GoogleLoginProvider, SocialAuthService, SocialUser } from 'angularx-social-login';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private url = environment.serverURL;
    public auth = false;
    private user;
    authState$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(this.auth);
    userData$: BehaviorSubject<SocialUser | ResponseModel> = new BehaviorSubject<SocialUser>(null);

    constructor(private http: HttpClient, private authService: SocialAuthService) {
        authService.authState.subscribe((user: SocialUser) => {
            if (user !== null) {
                this.auth = true;
                this.authState$.next(this.auth);
                this.userData$.next(user);
            }
        })
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
        return this.http.post(`${this.url}/users/login`, authData).subscribe((data: ResponseModel) => {
            this.auth = data.auth;
            this.authState$.next(this.auth);
            this.userData$.next(data);
        })
    }

    changePassword(authData: UserChangePasswordDTO): Observable<UserModel> {
        return this.http.post<UserModel>(`${this.url}/users/password`, authData)
    }

    editRolesOfUser(userId: string, roles: RoleModel[]) {
        return this.http.put(`${this.url}/users/${userId}/roles`, roles)
    }

    // Google login
    googleLogin() {
        this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    logout() {
        this.authService.signOut();
        this.auth = false;
        this.authState$.next(this.auth);
    }
}

export interface ResponseModel {
    token: string;
    auth: boolean;
    email: string;
    username: string;
    firstName: string;
    lastName: string;
    photoUrl: string;
    userId: string;
}
