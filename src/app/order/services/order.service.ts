import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  private apiBaseOrderUrl: string = environment.BASE_URL + 'order/';
  private apiBaseOrderDetailsUrl: string =
    environment.BASE_URL + 'order_details/';

  constructor(private _http: HttpClient) {}

  getAllBillDetails(): Observable<any> {
    return this._http.get(this.apiBaseOrderUrl + 'get_all_bill_details/');
  }

  getOrderDetails(orderId: number): Observable<any> {
    return this._http.get(
      this.apiBaseOrderDetailsUrl + '/get-order-details/' + orderId
    );
  }
}
