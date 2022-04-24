import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private apiBaseUserUrl: string = environment.BASE_URL + 'users/';
  private apiBaseCategoryUrl :string =environment.BASE_URL+'category/'
  constructor(private _http: HttpClient) {}

  getAllUserCount(): Observable<any> {
    return this._http.get(this.apiBaseUserUrl + 'all-users-count');
  }

  getAllCategoryCount():Observable<any>{
    return this._http.get(this.apiBaseCategoryUrl+'all-category-count/');
  }
}
