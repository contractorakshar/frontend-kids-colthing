import { Component, OnInit } from '@angular/core';
import * as Chart from 'chart.js';
import { ProductsService } from '../products/products.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  constructor(private _productService: ProductsService) {}

  ngOnInit(): void {
    let myChart = new Chart('myChart', {
      type: 'pie',
      data: {
        labels: ['Red', 'Blue', 'Yellow'],
        datasets: [
          {
            label: 'Total Count.',
            data: [300, 50, 100],
            backgroundColor: [
              'rgb(255, 99, 132)',
              'rgb(54, 162, 235)',
              'rgb(255, 205, 86)',
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        responsive: false,
      },
    });

    let myChart2 = new Chart('baar', {
      type: 'bar',
      data: {
        labels: [
          'USA',
          'Spain',
          'Italy',
          'France',
          'Germany',
          'UK',
          'India'
        ],
        datasets: [
          {
            data: [
              6, 2, 3, 8, 10,
            ],
            backgroundColor: ['red', 'orange'],
            borderWidth: 1,
          },
        ],
      },
      options: {
        legend: {
          display: false,
        },
        responsive: false,
      },
    });

    this.dashboardData();
  }

  dashboardData(): void {
    this._productService.getAllProducts().subscribe(
      (res) => {
        // res.result
        console.log(
          '🚀 ~ file: home.component.ts ~ line 91 ~ HomeComponent ~ this._productService.getAllProducts ~ res',
          res
        );
      },
      (err) => {
        console.log(
          '🚀 ~ file: home.component.ts ~ line 93 ~ HomeComponent ~ this._productService.getAllProducts ~ err',
          err
        );
      }
    );
  }
}
