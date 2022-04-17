import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  apiBaseUrl: string = environment.BASE_URL + 'users/';
  constructor(private _http: HttpClient) {}

  getAllUsers(): Observable<any> {
    return this._http.get(this.apiBaseUrl + 'all-users/');
  }

  getUserDetailsByEmail(userEmail: string): Observable<any> {
    return this._http.get(this.apiBaseUrl + '/user-details/' + userEmail);
  }

  editUserDetails(userData: any, userEmail: string): Observable<any> {
    console.log("🚀 ~ file: users.service.ts ~ line 21 ~ UsersService ~ editUserDetails ~ userData", userData)
    return this._http.put(
      this.apiBaseUrl + '/update-user/' + userEmail,
      userData
    );
  }
}
