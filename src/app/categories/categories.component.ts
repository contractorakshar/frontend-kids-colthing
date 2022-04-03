import { Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Category } from './models/category';
import { CategoryService } from './services/category.service';
import { MatDialog } from '@angular/material/dialog';
import { ViewMoreCategoryComponent } from './view-more-category/view-more-category.component';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/toast/toast.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css'],
})
export class CategoriesComponent implements OnInit {
  constructor(
    private _categoryService: CategoryService,
    public dialog: MatDialog,
    private _router: Router,
    public toastService: ToastService
  ) {
    this.dataSource = new MatTableDataSource();
  }
  categories: any[];
  displayedColumns: string[] = ['name', 'action'];
  dataSource: MatTableDataSource<Category[]>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getAllCategoriesData();
  }
  getAllCategoriesData(): void {
    this._categoryService.getAllCategories().subscribe(
      (res) => {
        this.categories = res.result;
        this.dataSource.data = this.categories;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
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

  viewMoreCategory(row: Category): void {
    this.dialog.open(ViewMoreCategoryComponent, {
      data: row,
    });
  }

  editCategory(id: string): void {
    this._router.navigate(['nav/categories/edit-category', id]);
  }
  removeCategory(row: any): void {
    if (confirm('Are you sure you want to Delete?')) {
      this._categoryService.removeCategory(row.id).subscribe(
        (res) => {
          this.categories.splice(this.categories.indexOf(row), 1);
          this.dataSource.data = this.categories;
          this.toastService.show('✅ Category Successfully Deleted', {
            classname: 'bg-success text-light',
            delay: 2000,
          });
        },
        (err) => {
          this.toastService.show('❌ Error While Deleting Category', {
            classname: 'bg-danger text-light',
            delay: 2000,
          });
        }
      );
    }
  }
}
