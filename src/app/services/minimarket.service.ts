import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Category} from '../model/category';
import {MiniMarket} from '../model/mini-market';

const baseURL = 'http://localhost:9090/api/minimarkets/v1';

@Injectable({
  providedIn: 'root'
})
export class MinimarketService {

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<MiniMarket[]> {
    return this.httpClient.get<MiniMarket[]>(baseURL);
  }

  read(minimarketId: number): Observable<MiniMarket> {
    return this.httpClient.get<MiniMarket>(`${baseURL}/${minimarketId}`);
  }

  create(minimarket: MiniMarket): Observable<MiniMarket> {
    return this.httpClient.post<MiniMarket>(baseURL, minimarket);
  }

  update(minimarketId: number, minimarket: MiniMarket): Observable<MiniMarket> {
    return this.httpClient.put<MiniMarket>(`${baseURL}/${minimarketId}`, minimarket);
  }

  delete(minimarketId: number): Observable<MiniMarket> {
    return this.httpClient.delete<MiniMarket>(`${baseURL}/${minimarketId}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(baseURL);
  }

  searchById(minimarketId: number): Observable<MiniMarket> {
    return this.httpClient.get<MiniMarket>(`${baseURL}/${minimarketId}`);
  }
}
