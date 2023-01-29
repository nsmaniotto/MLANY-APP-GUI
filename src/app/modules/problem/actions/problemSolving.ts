import { Action } from '@ngrx/store';
import { type } from 'src/app/utils/util';
import { ProblemSolving } from '../models/problemSolving';

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
export const ActionTypes = {
  CREATE_PROBLEM_SOLVING: type('[ProblemSolving] Create'),
  CREATE_PROBLEM_SOLVING_SUCCESS: type('[ProblemSolving] Create Success'),
  CREATE_PROBLEM_SOLVING_FAIL: type('[ProblemSolving] Create Fail'),
  PROBLEM_SOLVING_CREATED: type('[ProblemSolving] ProblemSolving created')
};

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class CreateProblemSolving implements Action {
  readonly type: string = ActionTypes.CREATE_PROBLEM_SOLVING;

  constructor(public payload: ProblemSolving) {}
}

export class CreateProblemSolvingSuccess implements Action {
  readonly type: string = ActionTypes.CREATE_PROBLEM_SOLVING_SUCCESS;

  constructor(public payload: ProblemSolving) {}
}

export class CreateProblemSolvingFail implements Action {
  readonly type: string = ActionTypes.CREATE_PROBLEM_SOLVING_FAIL;

  constructor(public payload: ProblemSolving) {}
}

export class ProblemSolvingCreated implements Action {
  readonly type: string = ActionTypes.PROBLEM_SOLVING_CREATED;

  constructor(public payload: ProblemSolving) {}
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | CreateProblemSolving
  | CreateProblemSolvingSuccess
  | CreateProblemSolvingFail;
