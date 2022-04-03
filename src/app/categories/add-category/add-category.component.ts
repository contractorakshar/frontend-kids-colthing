import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/toast/toast.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  addCategoryForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _categoryService: CategoryService,
    private _router: Router,
    public toastService: ToastService
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.addCategoryForm = this._fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-Z]*')]],
    });
  }
  onSubmit() {
    this._categoryService.addCategory(this.addCategoryForm.value).subscribe(
      (res: any) => {
        if (res.success) {
          this.toastService.show(res.message, {
            classname: 'bg-success text-light',
            delay: 2000,
          });
          this._router.navigate(['/nav/categories']);
        }
      },
      (err: any) => {
        this.toastService.show('❌ Error While Adding Category', {
          classname: 'bg-danger text-light',
          delay: 2000,
        });
      }
    );
  }
}
