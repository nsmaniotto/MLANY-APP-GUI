import { Action } from '@ngrx/store';
import { type } from 'src/app/utils/util';
import { Dataset } from '../models/dataset';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  UPLOAD_DATASET: type('[Dataset] Upload'),
  UPLOAD_DATASET_SUCCESS: type('[Dataset] Upload Success'),
  UPLOAD_DATASET_FAIL: type('[Dataset] Upload Fail'),
  DATASET_UPLOADED: type('[Dataset] Dataset uploaded'),
  SAVE_DATASET: type('[Dataset] Save'),
  SAVE_DATASET_SUCCESS: type('[Dataset] Save Success'),
  SAVE_DATASET_FAIL: type('[Dataset] Save Fail'),
  DATASET_SAVED: type('[Dataset] Dataset saved')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class UploadDataset implements Action {
  readonly type: string = ActionTypes.UPLOAD_DATASET;

  constructor(public payload: File) {}
}

export class UploadDatasetSuccess implements Action {
  readonly type: string = ActionTypes.UPLOAD_DATASET_SUCCESS;

  constructor(public payload: Dataset) {}
}

export class UploadDatasetFail implements Action {
  readonly type: string = ActionTypes.UPLOAD_DATASET_FAIL;

  constructor(public payload: Dataset) {}
}

export class DatasetUploaded implements Action {
  readonly type: string = ActionTypes.DATASET_UPLOADED;

  constructor(public payload: Dataset) {}
}

export class SaveDataset implements Action {
  readonly type: string = ActionTypes.SAVE_DATASET;

  constructor(public payload: Dataset) {}
}

export class SaveDatasetSuccess implements Action {
  readonly type: string = ActionTypes.SAVE_DATASET_SUCCESS;

  constructor(public payload: Dataset) {}
}

export class SaveDatasetFail implements Action {
  readonly type: string = ActionTypes.SAVE_DATASET_FAIL;

  constructor(public payload: Dataset) {}
}

export class DatasetSaved implements Action {
  readonly type: string = ActionTypes.DATASET_SAVED;

  constructor(public payload: Dataset) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | UploadDataset
  | UploadDatasetSuccess
  | UploadDatasetFail
  | SaveDataset
  | SaveDatasetSuccess
  | SaveDatasetFail;
