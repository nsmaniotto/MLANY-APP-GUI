import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { servicesUrl } from 'src/environments/servicesUrl';
import { ModelTraining } from '../models/modelTraining';

@Injectable({
  providedIn: 'root'
})
export class ModelTrainingService {
  constructor(private readonly http: HttpClient) {}

  deployModelFromTraining(modelTrainingId: number) {
    return this.http.post<number>(`${servicesUrl.modelTrainingUrl}/deploy`, modelTrainingId);
  }
}
