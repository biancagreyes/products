import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
//import 'rxjs/add/operator/map';
import { User } from './user';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class UserService {
  url = 'https://localhost:44319/';
  constructor(private http: HttpClient) { }

  registerUser(user: User): Observable<User> {
    const httpOptions = { headers: new HttpHeaders({ 'No-Auth': 'True' }) };
    return this.http.post<User>(this.url + 'api/Register/',
      user, httpOptions);
  }

  userAuthentication(userName, password) {
    var data = "username=" + userName + "&password=" + password + "&grant_type=password";
    var reqHeader = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(this.url + '/token', data, { headers: reqHeader });
  }

  getUserClaims() {
    return this.http.get(this.url + '/api/GetUserClaims');
  }

  public isAuthenticated(): Observable<boolean> {
    return this.getUserClaims().pipe(map(u => !!u));
  }
  //getAll(): Observable<User[]> {
  //  return this.http.get<User[]>(this.url);
  //}
  //getProductById(ProductId: number): Observable<Product> {
  //  return this.http.get<Product>(this.url + '/' + ProductId);
  //}
  //createNew(product: Product): Observable<Product> {
  //  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //  return this.http.post<Product>(this.url + '/Create/',
  //    product, httpOptions);
  //}
  //updateProduct(product: Product): Observable<Product> {
  //  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //  return this.http.put<Product>(this.url + '/Update/',
  //    product, httpOptions);
  //}
  //deleteProductEntry(ProductId: number): Observable<number> {
  //  const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
  //  return this.http.delete<number>(this.url + '/Delete?id=' + ProductId,
  //    httpOptions);
  //}
}  
