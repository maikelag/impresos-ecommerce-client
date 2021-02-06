import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {Observable} from "rxjs";
import { PermissisionModel } from '../../models';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {
  private url = environment.serverURL;

  constructor(private http: HttpClient) {
  }

  getAllPermissions(): Observable<PermissisionModel> {
    return this.http.get<PermissisionModel>(this.url + 'permissions');
  }
  
}
