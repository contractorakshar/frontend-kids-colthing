import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastService } from 'src/app/toast/toast.service';
import { Category } from '../models/category';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  editCategoryFrom: FormGroup;
  categoryId: string;
  constructor(
    private _fb: FormBuilder,
    private _routes: ActivatedRoute,
    private _categoryService: CategoryService,
    private _router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.categoryId = this._routes.snapshot.params['id'];
    this.getCategoryDetails();
    this.initForm();
  }

  getCategoryDetails(): void {
    this._categoryService.getCategoryById(this.categoryId).subscribe(
      (res) => {
        this.formDataBind(res.result[0]);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  initForm(): void {
    this.editCategoryFrom = this._fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    });
  }
  formDataBind(item: Category): void {
    this.editCategoryFrom.patchValue({
      name: item.name,
    });
  }
  onSubmit(): void {
    const { name } = this.editCategoryFrom.value;
    let categoryDetails = {
      id: this.categoryId,
      name,
    };
    this._categoryService.editCategory(categoryDetails).subscribe(
      (res) => {
        this.toastService.show(res.message, {
          classname: 'bg-success text-light',
          delay: 2000,
        });
        this._router.navigate(['/nav/categories']);
      },
      (err) => {
        this.toastService.show('❌ Error While Adding Category', {
          classname: 'bg-danger text-light',
          delay: 2000,
        });
      }
    );
  }
}
