import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { AuthResponse, Store } from '../auth/interfaces/auth.interfaces';
import { catchError, map, of, tap, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private _baseUrl: string = environment.baseUrl;
  private _store: Store;
  private _logout: string = '';

  get store(): Store{
    return {...this._store!};
  }

  constructor(private _http: HttpClient) { }

  verificarAuth(): Observable<boolean>{ // | boolean --> si puede retornar booleano (return true)
    if(!localStorage.getItem('kunanpa_token') && !localStorage.getItem('kunanpa_user') && !localStorage.getItem('kunanpa_logo')){
      console.log('No se encontro tokens');
      return of(false);
    }else{
      let number = localStorage.getItem('kunanpa_userId');
      this._store = {
        id: +number,
        email: '',
        nombre: localStorage.getItem('kunanpa_user'),
        urlLogo: localStorage.getItem('kunanpa_logo'),
      }
      return of(true);
    }
  }

  login(email: string, password: string){

    const url = `${this._baseUrl}/admin/login`;
    const body = {email,password};

    return this._http.post<AuthResponse>(url,body)
      .pipe(
        tap(resp => {
          localStorage.setItem('kunanpa_token',resp.token!);
          localStorage.setItem('kunanpa_user',resp.store.nombre!);
          localStorage.setItem('kunanpa_userId',resp.store.id.toString()!);
          localStorage.setItem('kunanpa_logo',resp.store.urlLogo!);
          if(resp.token){
            this._store = {
              id: resp.store.id,
              email: resp.store.email,
              nombre: resp.store.nombre,
              urlLogo: resp.store.urlLogo,
            }
          }
        }),
        map( resp => resp),
        catchError(err => of(err.error))
      );
  }

  logout(){
    this._http.get<any>(`${this._baseUrl}/admin/logout`,{
      headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('kunanpa_token')
      }}).subscribe(resp =>{
        console.log(resp.message);
        this._logout =  resp.message;
      })
      
    localStorage.removeItem('kunanpa_token');
    localStorage.removeItem('kunanpa_user');
    localStorage.removeItem('kunanpa_userId');
    localStorage.removeItem('kunanpa_logo');
  }
}
