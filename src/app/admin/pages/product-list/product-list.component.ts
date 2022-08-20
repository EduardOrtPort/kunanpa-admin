import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  public name = '&laquo; Anterior';

  constructor(private productoServicio: ProductService) { }

  ngOnInit() {
    this.productoServicio.listarProductos();
  }

  get productList(){
    return this.productoServicio.productList;
  }
  
  get paginar(){
    return this.productoServicio.paginar;
  }

  paginarUrl(url: string | null){
    if(url == null){
      return ;
    }else{
      this.productoServicio.paginarPorUrl(url);
    }
  }

}
