import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTooltipModule } from '@angular/material/tooltip';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule,
  ],
  exports: [
    MatPaginatorModule,
    MatSortModule,
    MatIconModule,
    MatTableModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDialogModule,
    MatDividerModule,
    MatListModule,
    MatTooltipModule,
  ],
})
export class SharedModule {}
