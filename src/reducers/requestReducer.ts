import { Reducer } from "redux";
import { RequestState } from '../store/index';
import { RequestAction } from '../actions/requestActions';
import { ADD_REQUEST, EDIT_REQUEST, REMOVE_REQUEST, SET_REQUESTS, SET_FIRST_FETCH } from '../constants/index';

const RequestsDefaultState: RequestState = {
    requests: [],
    firstFetch: false
};

const reducer: Reducer<RequestState, RequestAction> = 
    (state: RequestState = RequestsDefaultState, action: RequestAction) => {
  switch (action.type) {
    case ADD_REQUEST:
        return {
            requests: [...state.requests, action.request],
            firstFetch: state.firstFetch
        }
    case EDIT_REQUEST: 
        return {
            requests: state.requests.map((req) => {
                if (req.id === action.request.id) {
                    return {
                        ...req,
                        ...action.request
                    };
                } else {
                    return req;
                }
            }),
            firstFetch: state.firstFetch
        }
    case REMOVE_REQUEST:
        return {
            requests: state.requests.filter((req) => req.id !== action.id),
            firstFetch: state.firstFetch
        }
    case SET_REQUESTS:
        return {
            requests: action.requests,
            firstFetch: state.firstFetch
        }
    case SET_FIRST_FETCH:
        return {
            requests: state.requests,
            firstFetch: action.firstFetch
        }
    default:
      return state;
  }
};

export { reducer as requestReducer };