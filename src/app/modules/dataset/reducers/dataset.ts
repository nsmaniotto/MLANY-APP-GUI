import * as dataset from '../actions/dataset';

export interface State {
  uploaded: boolean;
  uploading: boolean;
  saved: boolean;
  saving: boolean;
  created: boolean;
  creating: boolean;
  refreshed: boolean;
}

const initialState: State = {
  uploaded: false,
  uploading: false,
  saved: false,
  saving: false,
  created: false,
  creating: false,
  refreshed: false
};

/* Reducers are pure js functions:
   get action, and payload
   return the new immutate state */
export function reducer(state = initialState, action: dataset.Actions): State {
  switch (action.type) {
    case dataset.ActionTypes.UPLOAD_DATASET: {
      return {
        ...state,
        uploading: true,
        uploaded: false
      };
    }

    case dataset.ActionTypes.SAVE_DATASET: {
      return {
        ...state,
        saving: true,
        saved: false
      };
    }

    default: {
      return {
        ...state
      };
    }
  }
}

export const getState = (state: { dataset: any; }) => state.dataset;
