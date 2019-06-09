import { Reducer } from "redux";
import { RequestState } from '../store/index';
import { RequestAction } from '../actions/requestActions';
import { ADD_REQUEST, EDIT_REQUEST, REMOVE_REQUEST, SET_REQUESTS, SET_FIRST_FETCH, SET_LOGS } from '../constants/index';

const RequestsDefaultState: RequestState = {
    requests: [],
    logs: [],
    firstFetch: false
};

const reducer: Reducer<RequestState, RequestAction> = 
    (state: RequestState = RequestsDefaultState, action: RequestAction) => {
  switch (action.type) {
    case ADD_REQUEST:
        return {
            requests: [...state.requests, action.request],
            logs: state.logs,
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
            logs: state.logs,
            firstFetch: state.firstFetch
        }
    case REMOVE_REQUEST:
        return {
            requests: state.requests.filter((req) => req.id !== action.id),
            logs: state.logs,
            firstFetch: state.firstFetch
        }
    case SET_REQUESTS:
        return {
            requests: action.requests,
            logs: state.logs,
            firstFetch: state.firstFetch
        }
    case SET_FIRST_FETCH:
        return {
            requests: state.requests,
            logs: state.logs,
            firstFetch: action.firstFetch
        }
    case SET_LOGS:
        return {
            requests: state.requests,
            logs: action.logs,
            firstFetch: state.firstFetch
        }
    default:
      return state;
  }
};

export { reducer as requestReducer };