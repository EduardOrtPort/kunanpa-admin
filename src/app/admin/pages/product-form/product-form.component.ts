import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ArregloFloral } from '../../interfaces/products.iterface';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  catArreglo: number[] = [];
  imagArreglo: any[] = [{}];
  urls: string[] | ArrayBuffer[] = [];
  namesImg: string[] = [];

  arreglo: ArregloFloral = {
    idVendedor: 0,
    nombre: '',
    descripcion: '',
    detalles: '',
    precioFinal: 0,
    descuento: 0,
    precioInicial: 0,
    stock: 0,
    categorias: [],
    imagenes: [],
  }

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.listarCategorias();
  }

  get categoryList(){
    return this.productService.categoryList;
  }

  agregarCat(cat: number){
    let valor: number = +cat;
    this.catArreglo.push(valor);

    localStorage.getItem('kunanpa_userId');
  }

  quitarCat(cat: number){
    const index = this.catArreglo.indexOf(cat)
    if (index !== -1) {
      this.catArreglo.splice(index, 1);
    }
    return ;
  }
  /*
  toArray(value: string): void {
    this.imagArreglo = value.split(/[\r\n]+/);
    console.log(this.imagArreglo);
  }*/

  onSelectFile(event) {
    
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;

      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        //
        this.namesImg.push(event.target.files[i].name);
        //
        //
        this.imagArreglo.push(event.target.files[i]);
        //
        reader.onload = (event:any) => {

          this.urls.push(event.target.result);
          //console.log(event.target.result);
        }

        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  publicarProducto(){
    const idLocal = localStorage.getItem('kunanpa_userId');
    const idVSend: number = +idLocal; 

    console.log('Valores q se agregaran a las imagenes',this.imagArreglo);

    this.arreglo.idVendedor = idVSend;
    this.arreglo.categorias = this.catArreglo;
    this.arreglo.imagenes = this.imagArreglo;
    this.arreglo.descuento = this.arreglo.precioInicial - this.arreglo.precioFinal;

    console.log(this.arreglo);

    this.productService.crearProducto(this.arreglo)
      .subscribe(resp => {
        console.log(resp.message);
      })

  }

}