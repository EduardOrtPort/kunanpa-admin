import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { ArregloFloral } from '../../interfaces/products.iterface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {

  catArreglo: number[] = [];
  imagArreglo: File[] = [];
  urls: string[] | ArrayBuffer[] = [];
  namesImg: string[] = [];
  private idLocal = localStorage.getItem('kunanpa_userId');
  private idVSend: number = +this.idLocal; 

  arreglo: ArregloFloral = {
    idVendedor: this.idVSend,
    nombre: '',
    descripcion: '',
    detalles: '',
    precioFinal: 0,
    descuento: 0,
    precioInicial: 0,
    stock: 0,
    categorias: [],
    imagenes: []
  }

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.listarCategorias();
  }

  get categoryList(){
    return this.productService.categoryList;
  }

  agregarCat(cat: number){
    const index = this.catArreglo.indexOf(cat);

    if(index){
      let valor: number = +cat;
      this.catArreglo.push(valor);

      console.log(this.catArreglo);
    }

    return ;

  }

  quitarCat(cat: number){
    const index = this.catArreglo.indexOf(cat);
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
    console.log(this.imagArreglo);
  }

  quitarImagen(imageP: number){
    if (imageP !== -1) {
      this.imagArreglo.splice(imageP, 1);
      this.namesImg.splice(imageP, 1);
      this.urls.splice(imageP, 1);
      console.log(this.imagArreglo);
    }
    return ;
  }

  publicarProducto(){
    if(this.arreglo.nombre.trim().length === 0){
      console.log(this.arreglo);
      Swal.fire('Error', 'El campo de nombre es necesario', 'error');
    }else{

      this.arreglo.descuento = this.arreglo.precioInicial - this.arreglo.precioFinal;
      const fd = new FormData;
      fd.append('idVendedor',this.idVSend.toString());
      fd.append('nombre',this.arreglo.nombre);
      fd.append('descripcion',this.arreglo.descripcion);
      fd.append('detalles',this.arreglo.detalles);
      fd.append('descuento',this.arreglo.descuento.toString());
      fd.append('precioFinal',this.arreglo.precioFinal.toString());
      fd.append('stock',this.arreglo.stock.toString());
      
      for(var i = 0; i < this.catArreglo.length; i++){
        fd.append('categorias[]',this.catArreglo[i].toString());
      }
      for(var i = 0; i < this.imagArreglo.length; i++){
        fd.append('imagenes[]',this.imagArreglo[i]);
      }
  
/*       this.arreglo.categorias = this.catArreglo;
      this.arreglo.imagenes = this.imagArreglo; */
  
      console.log(fd);
  
      this.productService.crearProducto(fd)
        .subscribe(resp => {
          console.log(resp.message);
          Swal.fire('Listo', resp.message, 'success');
        })
    }


  }

}
