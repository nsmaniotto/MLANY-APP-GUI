import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError, concatMap, map } from 'rxjs/operators';
import { DatasetService } from '../services/dataset.service';
import * as RouterActions from '../../../actions/goActions';
import * as datasetActions from '../actions/dataset';
import { Dataset } from '../models/dataset';

/**
 * This file get the action from component, make the HTTP Request to the API and
 * emit new action to say it's done correctly or not
 */

@Injectable()
export class DatasetEffect {
  constructor(
    private readonly actions$: Actions,
    private readonly datasetService: DatasetService
  ) {}

  datasetUpload$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<any>(datasetActions.ActionTypes.UPLOAD_DATASET),
    concatMap(action => {
      const item: File = action.payload;
      return this.datasetService.uploadDataset(item).pipe(
        map(dataset => new datasetActions.UploadDatasetSuccess(dataset)),
        catchError(error => of(new datasetActions.UploadDatasetFail(error)))
      );
    })
  ));

  datasetUploadSuccess$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<any>(datasetActions.ActionTypes.UPLOAD_DATASET_SUCCESS),
    concatMap(dataset => of(new datasetActions.DatasetUploaded(dataset)))
  ));

  datasetUploaded$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<any>(datasetActions.ActionTypes.DATASET_UPLOADED),
    map(action => {
      const dataset: Dataset = action.payload.payload;
      return new RouterActions.Go({
        path: [`/dataset/view/${dataset.id}`]
      });
    })
  ));

  datasetSave$: Observable<Action> = createEffect(() => this.actions$.pipe(
    ofType<any>(datasetActions.ActionTypes.SAVE_DATASET),
    concatMap(action => {
      const dataset: Dataset = action.payload;
      return this.datasetService.saveDataset(dataset).pipe(
        map(datasetResult => new datasetActions.SaveDatasetSuccess(datasetResult)),
        catchError(error => of(new datasetActions.SaveDatasetFail(error)))
      );
    })
  ));
}
