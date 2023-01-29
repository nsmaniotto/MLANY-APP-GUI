import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { servicesUrl } from 'src/environments/servicesUrl';
import { ProblemSolvingColumn } from '../models/problemSolvingColumn';

@Injectable({
  providedIn: 'root'
})
export class ProblemSolvingColumnService {
  constructor(private readonly http: HttpClient) {}

  getProblemSolvingColumnsByProblemSolvingId(problemSolvingId: number) {
    return this.http.get<ProblemSolvingColumn[]>(`${servicesUrl.problemSolvingColumnUrl}/problemSolvingId/${problemSolvingId}`);
  }
}
