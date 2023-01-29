import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ProblemService } from '../services/problem.service';
import * as RouterActions from '../../../actions/goActions';
import * as problemActions from '../actions/problem';
import { Problem } from '../models/problem';

/**
 * This file get the action from component, make the HTTP Request to the API and
 * emit new action to say it's done correctly or not
 */

@Injectable()
export class ProblemEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly problemService: ProblemService
  ) {}

  problemCreation$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<any>(problemActions.ActionTypes.CREATE_PROBLEM),
    concatMap(action => {
      const item: Problem = action.payload;
      return this.problemService.createProblem(item).pipe(
        map(problem => new problemActions.CreateProblemSuccess(problem)),
        catchError(error => of(new problemActions.CreateProblemFail(error)))
      );
    })
  ));

  problemCreateSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<any>(problemActions.ActionTypes.CREATE_PROBLEM_SUCCESS),
    concatMap(id => of(new problemActions.ProblemCreated(id)))
  ));

  problemCreated$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<any>(problemActions.ActionTypes.PROBLEM_CREATED),
    map(action => {
      const problemId = action.payload.payload;
      return new RouterActions.Go({
        path: [`/problem/view/${problemId}`]
      });
    })
  ));
}
