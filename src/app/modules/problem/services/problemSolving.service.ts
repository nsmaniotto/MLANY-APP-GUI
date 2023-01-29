import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { servicesUrl } from 'src/environments/servicesUrl';
import { ProblemSolving } from '../models/problemSolving';

@Injectable({
  providedIn: 'root'
})
export class ProblemSolvingService {
  constructor(private readonly http: HttpClient) {}

  createProblemSolving(problemSolving: ProblemSolving) {
    return this.http.post<ProblemSolving>(`${servicesUrl.problemSolvingUrl}/create`, problemSolving);
  }

  getProblemSolving(problemSolvingId: number) {
    return this.http.get<ProblemSolving>(`${servicesUrl.problemSolvingUrl}/${problemSolvingId}`);
  }
}
