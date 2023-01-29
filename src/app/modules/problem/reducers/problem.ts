import * as problem from '../actions/problem';

export interface State {
  created: boolean;
  creating: boolean;
  refreshed: boolean;
}

const initialState: State = {
  created: false,
  creating: false,
  refreshed: false
};

/* Reducers are pure js functions:
   get action, and payload
   return the new immutate state */
export function reducer(state = initialState, action: problem.Actions): State {
  switch (action.type) {
    case problem.ActionTypes.CREATE_PROBLEM: {
      return {
        ...state,
        creating: true,
        created: false
      }
    }

    default: {
      return {
        ...state
      }
    }
  }
}

export const getState = (state: { problem: any; }) => state.problem;
