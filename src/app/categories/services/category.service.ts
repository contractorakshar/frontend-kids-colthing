import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Category } from '../models/category';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoryUrl: string = environment.BASE_URL + 'category/';

  constructor(private _http: HttpClient) {}

  getAllCategories(): Observable<any> {
    return this._http.get(this.categoryUrl + 'all-categories');
  }

  addCategory(categoryData: Category): Observable<any> {
    return this._http.post(this.categoryUrl + 'add-category', categoryData);
  }

  getCategoryById(id: string): Observable<any> {
    return this._http.get(this.categoryUrl + 'category-details/' + id);
  }

  editCategory(categoryDetails: Category): Observable<any> {
    return this._http.put(
      this.categoryUrl + '/update-category/' + categoryDetails.id,
      categoryDetails
    );
  }
  removeCategory(id: string): Observable<any> {
    return this._http.delete(this.categoryUrl + 'soft-delete/' + id);
  }
}
