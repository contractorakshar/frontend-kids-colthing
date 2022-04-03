import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { SharedModule } from '../shared/shared.module';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';
import { UsersService } from './services/users.service';
import { ViewMoreUserComponent } from './view-more-user/view-more-user.component';
@NgModule({
  declarations: [UsersComponent, ViewMoreUserComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    SharedModule,
    MatInputModule,
    MatTooltipModule,
  ],
  providers:[UsersService],
})
export class UsersModule {}
