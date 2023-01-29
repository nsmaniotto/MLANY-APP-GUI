import { NavigationExtras } from "@angular/router";
import { Action } from "@ngrx/store";
import { type } from "src/app/utils/util";

/**
 * For each action type in an action group, make a simple
 * enum object for all of this group's action types.
 *
 * The 'type' utility function coerces strings into string
 * literal types and runs a simple check to guarantee all
 * action types in the application are unique.
 */
 export const ActionTypes = {
  GO: type('[Router] Go'),
  GO_SUCCESS: type('[Router] Go Success'),
  GO_ERROR: type('[Router] Go Error'),
  BACK: type('[Router] Back'),
  FORWARD: type('[Router] Forward'),
  HOME: type('[Router] Home')
};

export class Go implements Action {
  readonly type = ActionTypes.GO;

  constructor(
    public payload: {
      path: string[];
      query?: object;
      extras?: NavigationExtras;
    }
  ) {}
}

/**
 * Every action is comprised of at least a type and an optional
 * payload. Expressing actions as classes enables powerful
 * type checking in reducer functions.
 *
 * See Discriminated Unions: https://www.typescriptlang.org/docs/handbook/advanced-types.html#discriminated-unions
 */
export class GoSuccess implements Action {
  readonly type: string = ActionTypes.GO_SUCCESS;
}

export class GoError implements Action {
  readonly type: string = ActionTypes.GO_ERROR;
}

export class Back implements Action {
  readonly type: string = ActionTypes.BACK;
}

export class Forward implements Action {
  readonly type: string = ActionTypes.FORWARD;
}

export class Home implements Action {
  readonly type: string = ActionTypes.HOME;
}

/**
 * Export a type alias of all actions in this action group
 * so that reducers can easily compose action types
 */
export type Actions =
  | Go
  | GoSuccess
  | GoError
  | Back
  | Forward
  | Home;
