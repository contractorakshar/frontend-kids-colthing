import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CategoryService } from 'src/app/categories/services/category.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  addProductForm: FormGroup;
  selectedFile: File;
  productImage1: File;
  productImage2: File;
  categoriesArray: any[] = [];
  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _productService: ProductsService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getCategories();
  }

  onChange(fileData: any): void {
    this.selectedFile = <File>fileData.target.files[0];
  }
  onChangeImage1(fileData: any): void {
    this.productImage1 = <File>fileData.target.files[0];
  }
  onChangeImage2(fileData: any): void {
    this.productImage2 = <File>fileData.target.files[0];
  }
  getCategories(): void {
    this._categoryService.getAllCategories().subscribe(
      (res) => {
        this.categoriesArray = res.result;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  initForm(): void {
    this.addProductForm = this._fb.group({
      category_id: ['', [Validators.required]],
      name: ['', [Validators.required, Validators.pattern('^[a-zA-Z\\s]+$')]],
      manufacturer: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z]*')],
      ],
      color: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
      price: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      quantity: ['', [Validators.required, Validators.pattern('[0-9]*')]],
      cover_image: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image_1: ['', [Validators.required]],
      image_2: ['', [Validators.required]],
    });
  }
  onSubmit(): void {
    const formData = new FormData();
    formData.append('category_id', this.addProductForm.value.category_id);
    formData.append('name', this.addProductForm.value.name);
    formData.append('manufacturer', this.addProductForm.value.manufacturer);
    formData.append('color', this.addProductForm.value.color);
    formData.append('price', this.addProductForm.value.price);
    formData.append('quantity', this.addProductForm.value.quantity);
    formData.append('description', this.addProductForm.value.description);
    if (this.selectedFile != null) {
      formData.append('cover_image', this.selectedFile, this.selectedFile.name);
    } else {
      formData.append('cover_image', new Blob());
    }
    this._productService.addProduct(formData).subscribe(
      (res) => {
        this.addProductPhotos(res.result.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  addProductPhotos(id: string): void {
    let productPhotosData = new FormData();
    productPhotosData.append(
      'product-photos',
      this.productImage1,
      this.productImage1.name
    );
    productPhotosData.append(
      'product-photos',
      this.productImage2,
      this.productImage2.name
    );
    this._productService.addProductPhotos(productPhotosData, id).subscribe(
      (res) => {
        if(res.success){
          this._router.navigate(['/nav/products']);
        }
        
      },
      (err) => {
        console.log(
          '🚀 ~ file: add-product.component.ts ~ line 102 ~ AddProductComponent ~ addProductPhotos ~ err',
          err
        );
      }
    );
  }
}
