import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Category } from '../models/category';
@Component({
  selector: 'app-view-more-category',
  templateUrl: './view-more-category.component.html',
  styleUrls: ['./view-more-category.component.css']
})
export class ViewMoreCategoryComponent implements OnInit {

  constructor(public dialogref:MatDialogRef<ViewMoreCategoryComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Category) { }

  ngOnInit(): void {
  }

}
