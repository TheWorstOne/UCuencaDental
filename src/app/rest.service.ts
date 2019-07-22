import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable} from 'rxjs';
import {of} from "rxjs/observable/of";
import { map, catchError, tap } from 'rxjs/operators';


const endpoint = 'https://ucuencadental.azurewebsites.net/';
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

@Injectable()
export class RestService {

  constructor(private http: HttpClient) { }

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getProducts(): Observable<any> {
    return this.http.get(endpoint + 'producto/all').pipe(
      map(this.extractData));
  }

  getEquipos(): Observable<any> {
    return this.http.get(endpoint + 'equipos/all').pipe(
      map(this.extractData));
  }

  getInsumos(): Observable<any> {
    return this.http.get(endpoint + 'insumos/all').pipe(
      map(this.extractData));
  }

  getInstrumentos(): Observable<any> {
    return this.http.get(endpoint + 'instrumentos/all').pipe(
      map(this.extractData));
  }

  getInventarios(): Observable<any> {
    return this.http.get(endpoint + 'inventarios/control/all').pipe(
      map(this.extractData));
  }

  

  setProducts (products): Observable<any> {
    console.log(products);
    return this.http.post<any>(endpoint + 'data/new', JSON.stringify(products), httpOptions).pipe(
      tap((products) => console.log(`generate products w/ id=${products.data}`)),
      catchError(this.handleError<any>('generaProducts'))
    );
  }

  controlInventario (inventario): Observable<any> {
    console.log(inventario);
    return this.http.post<any>(endpoint + 'inventarios/control/new', JSON.stringify(inventario), httpOptions).pipe(
      tap((inventario) => console.log(`generate Inventory w/ id=${inventario}`)),
      catchError(this.handleError<any>('generaInventario'))
    );
  }
  

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
  
      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead
  
      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);
  
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
  
}