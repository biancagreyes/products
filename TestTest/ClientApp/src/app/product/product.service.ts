import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './product';

@Injectable({
  providedIn: 'root'
})

export class ProductService {
  url = 'https://localhost:44319/api/product';
  constructor(private http: HttpClient) { }
  getAll(): Observable<Product[]> {
    return this.http.get<Product[]>(this.url);
  }
  getProductById(ProductId: number): Observable<Product> {
    return this.http.get<Product>(this.url + '/' + ProductId);
  }
  createNew(product: Product): Observable<Product> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.post<Product>(this.url + '/Create/',
      product, httpOptions);
  }
  updateProduct(product: Product): Observable<Product> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.put<Product>(this.url + '/Update/',
      product, httpOptions);
  }
  deleteProductEntry(ProductId: number): Observable<number> {
    const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
    return this.http.delete<number>(this.url + '/Delete?id=' + ProductId,
      httpOptions);
  }
}  
