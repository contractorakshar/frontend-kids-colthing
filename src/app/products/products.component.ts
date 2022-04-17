import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ProductsService } from './products.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ViewMoreProductComponent } from './view-more-product/view-more-product.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
})
export class ProductsComponent implements OnInit {
  constructor(
    private _productsService: ProductsService,
    public dialog: MatDialog
  ) {
    this.dataSource = new MatTableDataSource();
  }
  displayedColumns: string[] = ['name', 'price', 'quantity', 'action'];
  dataSource: MatTableDataSource<any[]>;
  products: any[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getAllProductsData();
  }

  getAllProductsData(): void {
    this._productsService.getAllProducts().subscribe(
      (res) => {
        this.products = res.result;
        this.dataSource.data = this.products;
      },
      (err) => {
        alert('Error While Fetching Data Please Try Again');
      }
    );
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  viewMoreProduct(row: any): void {
    this.dialog.open(ViewMoreProductComponent, {
      data: row,
    });
  }
  editProduct(id: string): void {
    console.log(
      '🚀 ~ file: products.component.ts ~ line 52 ~ ProductsComponent ~ editProduct ~ id',
      id
    );
  }
  removeProduct(row: any) {
    console.log(
      '🚀 ~ file: products.component.ts ~ line 55 ~ ProductsComponent ~ removeProduct ~ row',
      row
    );
  }
}
