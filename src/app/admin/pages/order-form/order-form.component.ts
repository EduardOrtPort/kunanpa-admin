import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { OrderService } from 'src/app/services/order.service';
import { Articulo, Order, StatusChange } from '../../interfaces/orders.interface';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {

  estadosPedido: string[] = ['Pendiente', 'Aprobado', 'Preparando', 'Enviado', 'Finalizado'];

  public date: Date | null = null;
  public articuloList: Articulo[] = [];

  stateSend: StatusChange = {
    idCompra:    0,
    nuevoEstado: '',
  } 

  pedido: Order= {
    idCompra:    0,
    fecha:       this.date,
    estado:      '',
    facturacion: '',
    email:       '',
    telefono:    0,
    direccion:   '',
    nota:        null,
    articulos:   this.articuloList,
  }

  constructor(private orderService: OrderService,
              private activatedRout: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {

    this.activatedRout.params
    .pipe(switchMap(({id}) => this.orderService.getOrderPorId(id)))
    .subscribe(pedido => {
      console.log(pedido);
      this.pedido = pedido.data;
      console.log(this.pedido);
    });

  }

  actualizarEstado(){
    this.stateSend.idCompra = this.pedido.idCompra;
    console.log(this.stateSend);

    this.orderService.updateState(this.stateSend)
    .subscribe(resp => {
      console.log(resp.message);
      Swal.fire('Listo', resp.message, 'success');
      this.router.navigate(['/admin/orders/']);
    });


  }

}
