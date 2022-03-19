import { UsersService } from './services/users.service';
import { AfterViewInit, Component, ViewChild, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog'
import { ViewMoreUserComponent } from './view-more-user/view-more-user.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  constructor(private _userService: UsersService,public dialog: MatDialog) {
    this.dataSource = new MatTableDataSource();
  }
  displayedColumns: string[] = ['email', 'name', 'user_type', 'city', 'action'];
  dataSource: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  ngOnInit(): void {
    this.getAllUsersData();
  }

  getAllUsersData() {
    this._userService.getAllUsers().subscribe(
      (res) => {
        this.dataSource.data = res.result;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      (err) => {
        console.log(err);
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
  viewMoreUser(data: any) {
    this.dialog.open(ViewMoreUserComponent, {
      data
    });
  }
}
