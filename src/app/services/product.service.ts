import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { ProductsResponse, Flower, CategoriasResponse, Categorias, ArregloFloral, Link } from '../admin/interfaces/products.iterface';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productList: Flower[] = [];
  public paginar: Link[];
  public categoryList: Categorias[];
  public totalProduct: number;
  private _baseUrl: string = environment.baseUrl;
  private _baseUrl2: string = 'https://kunampa-back-production.up.railway.app/api';

  constructor(private http: HttpClient) { }

  listarProductos(){

    this.http.get<ProductsResponse>(`${this._baseUrl}/flores/store/1`,{
      // Send the authentication token here 
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('kunanpa_token')
      }})
    .subscribe(resp =>{
      console.log(resp)
      let total = localStorage.setItem('total',resp.total.toString());
      this.paginar =  resp.links;
      this.productList = resp.data;
      this.totalProduct = resp.total;
    })

  }

  paginarPorUrl(url: string){
    this.http.get<ProductsResponse>(`${url}`,{
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('kunanpa_token')
      }})
      .subscribe(resp =>{
        this.paginar =  resp.links;
        this.productList = resp.data;
      })
  }

  listarCategorias(){
    this.http.get<CategoriasResponse>(`${this._baseUrl}/categoria`)
    .subscribe(resp =>{
      this.categoryList = resp.data;
    })

    return this.categoryList;
  }

  crearProducto(arreglo: any): Observable<any>{
    return this.http.post<any>(`${this._baseUrl}/flores`,arreglo,{
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('kunanpa_token')
      }});
  }

  eliminarProducto(id: number){
    this.http.delete<any>(`${this._baseUrl2}/flores/${id}`)
      .subscribe((res) => console.log(res));
  }


  

}
