import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Promotion} from '../model/promotion';

const baseURL = 'http://localhost:8080/v1/promotions';

@Injectable({
  providedIn: 'root'
})
export class PromotionsService {

  constructor(private httpClient: HttpClient) {}

  readAll(): Observable<Promotion[]> {
    return this.httpClient.get<Promotion[]>(baseURL);
  }

  read(promotionId: number): Observable<Promotion> {
    return this.httpClient.get<Promotion>(`${baseURL}/${promotionId}`);
  }

  create(promotion: Promotion): Observable<Promotion> {
    return this.httpClient.post<Promotion>(baseURL, promotion);
  }

  update(promotionId: number, promotion: Promotion): Observable<Promotion> {
    return this.httpClient.put<Promotion>(`${baseURL}/${promotionId}`, promotion);
  }

  delete(promotionId: number): Observable<Promotion> {
    return this.httpClient.delete<Promotion>(`${baseURL}/${promotionId}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(baseURL);
  }

  searchById(promotionId: number): Observable<Promotion> {
    return this.httpClient.get<Promotion>(`${baseURL}/${promotionId}`);
  }
}
