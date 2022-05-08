import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Manufacturer} from '../model/manufacturer';


const baseURL = 'http://localhost:9090/api/manufacturers/v1';

@Injectable({
  providedIn: 'root'
})
export class ManufacturerService {

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<Manufacturer[]> {
    return this.httpClient.get<Manufacturer[]>(baseURL);
  }

  read(manufacturerId: number): Observable<Manufacturer> {
    return this.httpClient.get<Manufacturer>(`${baseURL}/${manufacturerId}`);
  }

  create(manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.httpClient.post<Manufacturer>(baseURL, manufacturer);
  }

  update(manufacturerId: number, manufacturer: Manufacturer): Observable<Manufacturer> {
    return this.httpClient.put<Manufacturer>(`${baseURL}/${manufacturerId}`, manufacturer);
  }

  delete(manufacturerId: number): Observable<Manufacturer> {
    return this.httpClient.delete<Manufacturer>(`${baseURL}/${manufacturerId}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(baseURL);
  }

  searchById(manufacturerId: number): Observable<Manufacturer> {
    return this.httpClient.get<Manufacturer>(`${baseURL}/${manufacturerId}`);
  }
}
