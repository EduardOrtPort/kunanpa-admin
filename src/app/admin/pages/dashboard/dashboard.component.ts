import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import { OrderService } from '../../../services/order.service';
import { async } from '@angular/core/testing';

// core components
import {
  chartOptions,
  parseOptions,
  chartExample1,
  chartExample2
} from "../../../variables/charts";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public datasets: any;
  public data: any;
  public salesChart;
  public clicked: boolean = true;
  public clicked1: boolean = false;

  datasetVentas;
  datasetPedidos;

  constructor(private orderService: OrderService){

  }

  ngOnInit() {

    this.dataSetsResponse();

    this.datasets = [
      [0, 20, 10, 30, 15, 40, 20, 60, 60],
      [0, 20, 5, 25, 10, 30, 15, 40, 40]
    ];
    this.data = this.datasets[0];
    
    parseOptions(Chart, chartOptions());

  }

  async dataSetsResponse(){
    this.datasetVentas = await this.orderService.reporteVentas().toPromise();

    this.datasetPedidos = await this.orderService.reportePedidos().toPromise();

    console.log(this.datasetVentas,this.datasetPedidos)
    
    var chartSales = document.getElementById('chart-sales');

    this.salesChart = new Chart(chartSales, {
			type: 'line',
			options: chartExample1.options,
			data: this.datasetVentas
		});

    var chartOrders = document.getElementById('chart-orders');

    var ordersChart = new Chart(chartOrders, {
      type: 'bar',
      options: chartExample2.options,
      data: this.datasetPedidos
    });
  }

  public updateOptions() {
    this.salesChart.data.datasets[0].data = this.datasetVentas;
    this.salesChart.update();
  }

}
