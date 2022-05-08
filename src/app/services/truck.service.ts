import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Truck} from '../model/truck';

const baseURL = 'http://localhost:9090/api/trucks/v1';

@Injectable({
  providedIn: 'root'
})
export class TruckService {

  constructor(private httpClient: HttpClient) { }

  readAll(): Observable<Truck[]> {
    return this.httpClient.get<Truck[]>(baseURL);
  }

  read(truckId: number): Observable<Truck> {
    return this.httpClient.get<Truck>(`${baseURL}/${truckId}`);
  }

  create(truck: Truck): Observable<Truck> {
    return this.httpClient.post<Truck>(baseURL, truck);
  }

  update(truckId: number, truck: Truck): Observable<Truck> {
    return this.httpClient.put<Truck>(`${baseURL}/${truckId}`, truck);
  }

  delete(truckId: number): Observable<Truck> {
    return this.httpClient.delete<Truck>(`${baseURL}/${truckId}`);
  }

  deleteAll(): Observable<any> {
    return this.httpClient.delete(baseURL);
  }

  searchById(truckId: number): Observable<Truck> {
    return this.httpClient.get<Truck>(`${baseURL}/${truckId}`);
  }
}
