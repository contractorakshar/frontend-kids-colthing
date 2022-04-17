import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  productBaseUrl: string = environment.BASE_URL + 'products/';
  productPhotosBaseUrl: string = environment.BASE_URL + 'product-photos/';
  constructor(private _http: HttpClient) {}

  getAllProducts(): Observable<any> {
    return this._http.get(this.productBaseUrl + 'all-products');
  }

  addProduct(productData: any): Observable<any> {
    return this._http.post(this.productBaseUrl + 'add-product', productData);
  }

  addProductPhotos(photosData: any, id: string): Observable<any> {
    return this._http.post(
      this.productPhotosBaseUrl + 'app-product-photos/' + id,
      photosData
    );
  }

  getProductPhotosById(id: string): Observable<any> {
    return this._http.get(
      this.productPhotosBaseUrl + 'get-product-photos/' + id
    );
  }

  getProductDetailsById(id: string): Observable<any> {
    return this._http.get(this.productBaseUrl + 'product-details/' + id);
  }
}
