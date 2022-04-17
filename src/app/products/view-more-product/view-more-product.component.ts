import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductsService } from '../products.service';
@Component({
  selector: 'app-view-more-product',
  templateUrl: './view-more-product.component.html',
  styleUrls: ['./view-more-product.component.css'],
})
export class ViewMoreProductComponent implements OnInit {
  productPhotos: any;
  constructor(
    private _productService: ProductsService,
    public dialogref: MatDialogRef<ViewMoreProductComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.getProductPhotos();
  }

  getProductPhotos(): void {
    this._productService.getProductPhotosById(this.data.id).subscribe(
      (res) => {
        this.productPhotos = res.result;
      },
      (err) => {
        console.log(
          '🚀 ~ file: view-more-product.component.ts ~ line 25 ~ ViewMoreProductComponent ~ this._productService.getProductDetailsById ~ err',
          err
        );
      }
    );
  }
}
