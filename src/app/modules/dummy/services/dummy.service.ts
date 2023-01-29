import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { servicesUrl } from 'src/environments/servicesUrl';
import { Dummy } from '../models/dummy';

@Injectable({
  providedIn: 'root'
})
export class DummyService {
  constructor(private readonly http: HttpClient) {}

  save(dummy: Dummy) {
    return this.http.post<Dummy>(`${servicesUrl.dummyUrl}/save`, dummy);
  }

  getDummy(id: number) {
    return this.http.get<Dummy>(`${servicesUrl.dummyUrl }/${id}`);
  }

  delete(dummy: Dummy) {
    return this.http.post<Dummy>(`${servicesUrl.dummyUrl}/delete`, dummy);
  }
}
