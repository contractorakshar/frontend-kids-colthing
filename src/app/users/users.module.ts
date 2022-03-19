import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersService } from './services/users.service';
import { ViewMoreUserComponent } from './view-more-user/view-more-user.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
@NgModule({
  declarations: [UsersComponent, ViewMoreUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatInputModule,
    MatIconModule,
    MatTooltipModule,
    MatDialogModule,
    MatDividerModule, 
    MatListModule,
  ],
  providers:[UsersService],
})
export class UsersModule {}
