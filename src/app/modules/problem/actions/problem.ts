import { Action } from '@ngrx/store';
import { type } from 'src/app/utils/util';
import { Problem } from '../models/problem';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  CREATE_PROBLEM: type('[Problem] Create'),
  CREATE_PROBLEM_SUCCESS: type('[Problem] Create Success'),
  CREATE_PROBLEM_FAIL: type('[Problem] Create Fail'),
  PROBLEM_CREATED: type('[Problem] Problem created')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class CreateProblem implements Action {
  readonly type: string = ActionTypes.CREATE_PROBLEM;

  constructor(public payload: Problem) {}
}

export class CreateProblemSuccess implements Action {
  readonly type: string = ActionTypes.CREATE_PROBLEM_SUCCESS;

  constructor(public payload: Problem) {}
}

export class CreateProblemFail implements Action {
  readonly type: string = ActionTypes.CREATE_PROBLEM_FAIL;

  constructor(public payload: Problem) {}
}

export class ProblemCreated implements Action {
  readonly type: string = ActionTypes.PROBLEM_CREATED;

  constructor(public payload: Problem) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | CreateProblem
  | CreateProblemSuccess
  | CreateProblemFail;
