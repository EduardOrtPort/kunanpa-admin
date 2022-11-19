import { Component, OnInit } from '@angular/core';
import { timer } from 'rxjs';
import Swal from 'sweetalert2';
import { ProfileService } from '../../../services/profile.service';
import { StoreData } from '../../interfaces/profile.interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userId = localStorage.getItem('kunanpa_userId')
  store: StoreData

  isLoading = true;
  fileToUpload: any;
  imageUrl: any;

  fakeurl = 'https://www.flowershop.cl/wp-content/uploads/2020/06/00_logo_flowershop_WEB_texto-negro-2.png'
  total = ''

  tienda = {
    email: '',
    nombre: '',
    urlLogo: '',
    telefono: '',
    direccion: '',
  }

  tienda2 = {
    email: '',
    nombre: '',
    urlLogo: '',
    telefono: '',
    direccion: '',
  }

  constructor(public profileService: ProfileService) { 
  //let nombreTienda = localStorage.setItem('kunanpa_user', 'FlowerShop')
  //let correoTienda = localStorage.setItem('storeEmail', 'ventas@flowershop.com')
  //let telefonoTienda = localStorage.setItem('storePhone', '99898743')
  //let direccionTienda = localStorage.setItem('storeAdress',"Puente Piedra Av. Pan. Norte Km.123")
  //let imagenTienda = localStorage.setItem('kunanpa_logo', "https://res.cloudinary.com/yachayhuasi/image/upload/v1659742329/kunampa/flower_shop_uolu4v.png")

  }

  ngOnInit() {
    
    //this.profileService.getStoreData(this.userId)
    //.subscribe(res => {
    //  console.log(res);
    //  this.store = res.data;
    //  console.log(this.store);
    //});

    this.total = localStorage.getItem('total')

    this.tienda.email = localStorage.getItem('storeEmail');
    this.tienda.nombre = localStorage.getItem('kunanpa_user');
    this.tienda.urlLogo = localStorage.getItem('kunanpa_logo');
    this.tienda.telefono = localStorage.getItem('storePhone');
    this.tienda.direccion = localStorage.getItem('storeAdress');

    this.tienda2.email = localStorage.getItem('storeEmail');
    this.tienda2.nombre = localStorage.getItem('kunanpa_user');
    this.tienda2.urlLogo = localStorage.getItem('kunanpa_logo');
    this.tienda2.telefono = localStorage.getItem('storePhone');
    this.tienda2.direccion = localStorage.getItem('storeAdress');
    this.isLoading = false;

    this.imageUrl = this.tienda.urlLogo;

  }


  saveFake(){
    console.log('dasdsasd')
    this.tienda2.email = this.tienda.email;
    this.tienda2.nombre = this.tienda.nombre;
    this.tienda2.urlLogo = this.fakeurl;
    this.tienda2.telefono = this.tienda.telefono;
    this.tienda2.direccion = this.tienda.direccion;

    this.isLoading = true;


    let nombreTienda = localStorage.setItem('kunanpa_user', this.tienda.nombre)
    let correoTienda = localStorage.setItem('storeEmail', this.tienda.email)
    let telefonoTienda = localStorage.setItem('storePhone', this.tienda.telefono)
    let direccionTienda = localStorage.setItem('storeAdress',this.tienda.direccion)
    let imagenTienda = localStorage.setItem('kunanpa_logo', this.fakeurl)

    timer(2000)
    .subscribe(res =>{
      this.isLoading = false;
    });

    Swal.fire('Listo', 'Datos actualizados', 'success');

  }

  imageChange(file: FileList){
    this.fileToUpload = file.item(0);

    //Show image preview
    let reader = new FileReader();
    console.log("dsads")
    reader.onload = (event: any) => {
      this.imageUrl = event.target.result;
    }
    reader.readAsDataURL(this.fileToUpload);

    
  }








}
