import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { OrderViewMoreComponent } from './order-view-more/order-view-more.component';
import { OrderService } from './services/order.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
})
export class OrderComponent implements OnInit {
  constructor(private _orderService: OrderService, public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  billDetails: any[];
  displayedColumns: string[] = ['email', 'total', 'bill_date', 'payment_method','action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getAllBillDetails();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getAllBillDetails(): void {
    this._orderService.getAllBillDetails().subscribe(
      (res) => {
        if (res.success) {
          this.billDetails = res.result;
          this.dataSource.data = this.billDetails;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      },
      (err) => {
        console.log(
          '🚀 ~ file: order.component.ts ~ line 34 ~ OrderComponent ~ this._orderService.getAllBillDetails ~ err',
          err
        );
      }
    );
  }

  viewMoreOrder(billDetails:any):void{
    this.dialog.open(OrderViewMoreComponent, {
      data: billDetails,
    });
  }
}
