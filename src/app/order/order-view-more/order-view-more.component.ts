import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { UsersService } from 'src/app/users/services/users.service';
import { OrderService } from '../services/order.service';

@Component({
  selector: 'app-order-view-more',
  templateUrl: './order-view-more.component.html',
  styleUrls: ['./order-view-more.component.css'],
})
export class OrderViewMoreComponent implements OnInit {
  orderDetails: any[];
  userDetails: any;
  constructor(
    public dialogref: MatDialogRef<OrderViewMoreComponent>,
    @Inject(MAT_DIALOG_DATA) public billDetails: any,
    private _orderService: OrderService,
    private _userService: UsersService
  ) {}

  ngOnInit(): void {
    this.getOrderDetails();
    this.getUserShippingDetails();
  }

  getUserShippingDetails(): void {
    this._userService
      .getUserDetailsByEmail(this.billDetails.email_id)
      .subscribe(
        (res) => {
          if (res.success) {
            this.userDetails = res.result;
          }
        },
        (err) => {
          console.log(
            '🚀 ~ file: order-view-more.component.ts ~ line 32 ~ OrderViewMoreComponent ~ getUserShippingDetails ~ err',
            err
          );
        }
      );
  }

  getOrderDetails(): void {
    this._orderService.getOrderDetails(this.billDetails.id).subscribe(
      (res) => {
        if (res.success) {
          this.orderDetails = res.result;
        }
      },
      (err) => {
        console.log(
          '🚀 ~ file: order-view-more.component.ts ~ line 24 ~ OrderViewMoreComponent ~ this._orderService.getOrderDetails ~ err',
          err
        );
      }
    );
  }
}
