import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { StoreData } from '../admin/interfaces/profile.interface';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private _store: StoreData;
  private _baseUrl: string = environment.baseUrl;
  private _baseUrl2: string = 'https://new-back-kunampa-production.up.railway.app/api'

  get store(): StoreData{
    return {...this._store!};
  }

  constructor(private http: HttpClient) { }


  getStoreData(Id: string): Observable<any>{
    return this.http.get<any>(`${this._baseUrl2}/admin/${Id}`,{
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('kunanpa_token')
        }});
  }

  // updateState(estado: StatusChange): Observable<any>{
  //   return this.http.post<any>(`${this._baseUrl}/cambiar-estado`,estado,{
  //       headers: {
  //           'Authorization': 'Bearer ' + localStorage.getItem('kunanpa_token')
  //       }});
  // }

  

}
