import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import Swal from 'sweetalert2';
import { timer } from 'rxjs';
import { SmartMG } from '../../../swal.config';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss']
})
export class ProductListComponent implements OnInit {

  constructor(private productoServicio: ProductService) { }

  isLoad = true;

  ngOnInit() {
    this.productoServicio.listarProductos();

    this.isLoad=false;
  }

  get productList(){
    return this.productoServicio.productList;
  }
  
  get paginar(){
    return this.productoServicio.paginar;
  }

  get totalProduct(){
    return this.productoServicio.totalProduct;
  }

  paginarUrl(url: string | null){
    if(url == null){
      return ;
    }else{
      const newUrl = url.replace('http://','https://');
      this.productoServicio.paginarPorUrl(newUrl);
    }
  }
  

  eliminar(idProduct: number){
    
    SmartMG.fire({
      title: '¿Estas seguro de eliminar?',
      text: "Confirmar para continuar",
      icon: 'warning',
      showCancelButton: true,
    }).then((result) => {
      if (result.isConfirmed) {

        this.productoServicio.eliminarProducto(idProduct);

        Swal.fire(
          'Eliminado!',
          'Tu producto ha sido eliminado.',
          'success'
        )
        this.isLoad=true;

        this.productoServicio.listarProductos();
        this.totalProduct

        timer(500).subscribe(
          res => {
            this.isLoad=false;
          }
        )
      }
    })
    
  }

}
