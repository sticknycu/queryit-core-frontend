import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../model/category';

const baseURL = 'http://localhost:9090/api/categories/v1';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<Category[]> {
    return this.httpClient.get<Category[]>(baseURL);
  }

  read(categoryId: number): Observable<Category> {
    return this.httpClient.get<Category>(`${baseURL}/${categoryId}`);
  }

  create(category: Category): Observable<Category> {
    return this.httpClient.post<Category>(baseURL, category);
  }

  update(categoryId: number, category: Category): Observable<Category> {
    return this.httpClient.put<Category>(`${baseURL}/${categoryId}`, category);
  }

  delete(categoryId: number): Observable<Category> {
    return this.httpClient.delete<Category>(`${baseURL}/${categoryId}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(baseURL);
  }

  searchById(categoryId: number): Observable<Category> {
    return this.httpClient.get<Category>(`${baseURL}/${categoryId}`);
  }
}
