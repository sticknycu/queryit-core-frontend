import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Product} from '../model/product';

const baseURL = 'http://localhost:8080/v1/products';
const baseURLByCategoryId = 'http://localhost:8080/v1/productsByCategoryId';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private httpClient: HttpClient) {}

  readAll(): Observable<Product[]> {
    return this.httpClient.get<Product[]>(baseURL);
  }

  read(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${baseURL}/${productId}`);
  }

  getProductsByCategoryId(categoryId: number): Observable<Product[]> {
    return this.httpClient.get<Product[]>(`${baseURLByCategoryId}/${categoryId}`);
  }

  create(product: Product): Observable<Product> {
    return this.httpClient.post<Product>(baseURL, product);
  }

  update(productId: number, product: Product): Observable<Product> {
    return this.httpClient.put<Product>(`${baseURL}/${productId}`, product);
  }

  delete(productId: number): Observable<Product> {
    return this.httpClient.delete<Product>(`${baseURL}/${productId}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(baseURL);
  }

  searchById(productId: number): Observable<Product> {
    return this.httpClient.get<Product>(`${baseURL}/${productId}`);
  }
}
