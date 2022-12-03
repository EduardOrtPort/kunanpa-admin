import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { PedidosResponse, Pedido, OrderDetails, StatusChange } from '../admin/interfaces/orders.interface';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  public orderList: Pedido[] = [];
  public pedidos: PedidosResponse;
  private _baseUrl: string = environment.baseUrl;
  private _aux: string = "default";
  public cumple: number = 0;
  public aniv: number = 0;

  constructor(private http: HttpClient) { }

  listarPedidos(): PedidosResponse{
    this.http.get<PedidosResponse>(`${this._baseUrl}/pedidos/1`,{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('kunanpa_token')
        }})
        .subscribe(resp =>{
            this.pedidos = resp;
            this.orderList = resp.data;
          })
   
        return this.pedidos;
  }

  getOrderPorId(Id: string): Observable<OrderDetails>{
    return this.http.get<OrderDetails>(`${this._baseUrl}/detalles-pedido/${Id}`,{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('kunanpa_token')
        }});
  }

  updateState(estado: StatusChange): Observable<any>{
    return this.http.post<any>(`${this._baseUrl}/cambiar-estado`,estado,{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('kunanpa_token')
        }});
  }

  reporteVentas(){
    return this.http.get<any>(`${this._baseUrl}/dashboard/ventas`);
  }

  reportePedidos(){
    return this.http.get<any>(`${this._baseUrl}/dashboard/pedidos`);
  }

}
