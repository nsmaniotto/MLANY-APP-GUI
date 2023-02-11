import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { servicesUrl } from 'src/environments/servicesUrl';
import { Dataset } from '../../dataset/models/dataset';
import { Problem } from '../models/problem';

@Injectable({
  providedIn: 'root'
})
export class ProblemService {
  constructor(private readonly http: HttpClient) {}

  save(problem: Problem) {
    return this.http.post<Problem>(`${servicesUrl.problemUrl}/save`, problem);
  }

  createProblem(problem: Problem) {
    return this.http.post<Problem>(`${servicesUrl.problemUrl}/create`, problem);
  }

  getProblem(problemId: number) {
    return this.http.get<Problem>(`${servicesUrl.problemUrl}/${problemId}`);
  }

  getProblems() {
    return this.http.get<Problem[]>(`${servicesUrl.problemUrl}`);
  }

  getProblemTypeLabels() {
    return this.http.get<string[]>(`${servicesUrl.problemUrl}/type/label`);
  }

  getLinkedDatasets(problemId: number) {
    return this.http.get<Dataset[]>(`${servicesUrl.problemUrl}/${problemId}/linkedDatasets`);
  }

  updateEndPoint(problemId: number, endPoint: string) {
    return this.http.post<Problem>(`${servicesUrl.problemUrl}/${problemId}/endPoint/update`, endPoint);
  }
}
