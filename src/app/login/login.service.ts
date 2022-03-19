import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private apiBaseUrl: string = 'http://localhost:3000/users/login';

  constructor(private _http: HttpClient) {}

  userLogin(userData: object): Observable<any> {
    return this._http.post(this.apiBaseUrl, userData);
  }
}
