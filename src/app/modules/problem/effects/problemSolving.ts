import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { ProblemSolvingService } from '../services/problemSolving.service';
import * as RouterActions from '../../../actions/goActions';
import * as problemSolvingActions from '../actions/problemSolving';
import { ProblemSolving } from '../models/problemSolving';

/**
 * This file get the action from component, make the HTTP Request to the API and
 * emit new action to say it's done correctly or not
 */

@Injectable()
export class ProblemSolvingEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly problemSolvingService: ProblemSolvingService
  ) {}

  problemSolvingCreation$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<any>(problemSolvingActions.ActionTypes.CREATE_PROBLEM_SOLVING),
    concatMap(action => {
      const item: ProblemSolving = action.payload;
      return this.problemSolvingService.createProblemSolving(item).pipe(
        map(problemSolving => new problemSolvingActions.CreateProblemSolvingSuccess(problemSolving)),
        catchError(error => of(new problemSolvingActions.CreateProblemSolvingFail(error)))
      );
    })
  ));

  problemSolvingCreationSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<any>(problemSolvingActions.ActionTypes.CREATE_PROBLEM_SOLVING_SUCCESS),
    concatMap(problemSolving => of(new problemSolvingActions.ProblemSolvingCreated(problemSolving)))
  ));

  problemSolvingCreated$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<any>(problemSolvingActions.ActionTypes.PROBLEM_SOLVING_CREATED),
    map(action => {
      const problemSolving = action.payload.payload;
      return new RouterActions.Go({
        path: [`/problem/view/${problemSolving.problemId}`]
      });
    })
  ));
}
