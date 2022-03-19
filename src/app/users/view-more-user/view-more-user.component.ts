import { Component, OnInit,Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-view-more-user',
  templateUrl: './view-more-user.component.html',
  styleUrls: ['./view-more-user.component.css']
})
export class ViewMoreUserComponent implements OnInit {

  constructor(public dialogref:MatDialogRef<ViewMoreUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {    
  }

}
