import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Deposit} from '../model/deposit';

const baseURL = 'http://localhost:9090/api/deposits/v1';

@Injectable({
  providedIn: 'root'
})
export class DepositService {

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<Deposit[]> {
    return this.httpClient.get<Deposit[]>(baseURL);
  }

  read(depositId: number): Observable<Deposit> {
    return this.httpClient.get<Deposit>(`${baseURL}/${depositId}`);
  }

  create(deposit: Deposit): Observable<Deposit> {
    return this.httpClient.post<Deposit>(baseURL, deposit);
  }

  update(depositId: number, deposit: Deposit): Observable<Deposit> {
    return this.httpClient.put<Deposit>(`${baseURL}/${depositId}`, deposit);
  }

  delete(depositId: number): Observable<Deposit> {
    return this.httpClient.delete<Deposit>(`${baseURL}/${depositId}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(baseURL);
  }

  searchById(depositId: number): Observable<Deposit> {
    return this.httpClient.get<Deposit>(`${baseURL}/${depositId}`);
  }
}
