import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';


@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {

  constructor(private orderServicio: OrderService) { }

  ngOnInit() {
    this.orderServicio.listarPedidos();
  }

  get orderList(){
    return this.orderServicio.orderList;
  }
  
  /*get paginar(){
    return this.productoServicio.paginar;
  }

  paginarUrl(url: string | null){
    if(url == null){
      return ;
    }else{
      this.productoServicio.paginarPorUrl(url);
    }
  }*/

}
