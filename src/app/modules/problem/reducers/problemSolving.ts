import * as problemSolving from '../actions/problemSolving';

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
export function reducer(state = initialState, action: problemSolving.Actions): State {
  switch (action.type) {
    case problemSolving.ActionTypes.CREATE_PROBLEM_SOLVING: {
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

export const getState = (state: { problemSolving: any; }) => state.problemSolving;
