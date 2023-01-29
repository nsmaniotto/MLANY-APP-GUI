import { Location } from '@angular/common';
import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { concatMap, map } from 'rxjs/operators';
import * as RouterActions from '../actions/goActions';
import { Router } from '@angular/router';

/**
 * This file get the action from component, make the HTTP Request to the API and
 * emit new action to say it's done correctly or not
 */

@Injectable()
export class RouterEffects {
  constructor(
    private readonly actions$: Actions,
    private readonly router: Router,
    private readonly location: Location
  ) {}

  navigate$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<any>(RouterActions.ActionTypes.GO),
    concatMap(action => {
      const queryParams = action.payload.query;
      this.router.navigate(action.payload.path, { queryParams, ...action.payload.extras });
      return of(new RouterActions.GoSuccess());
    })
  ));

  navigateBack$ = createEffect(() => {
      return this.actions$.pipe(
        ofType<any>(RouterActions.ActionTypes.BACK),
        map(() => this.location.back())
      );
    },
    { dispatch: false }
  );

  navigateForward$ = createEffect(() => {
      return this.actions$.pipe(
          ofType<any>(RouterActions.ActionTypes.FORWARD),
          map(() => this.location.forward())
      );
    },
    { dispatch: false }
  );
}
