import { Reducer } from "redux";
import { RequestState } from '../store/index';
import { RequestAction, RemoveRequest } from '../actions/requestActions';
import { ADD_REQUEST, EDIT_REQUEST, REMOVE_REQUEST, SET_REQUESTS } from '../constants/index';

const RequestsDefaultState: RequestState = {
    requests: []
};

const reducer: Reducer<RequestState, RequestAction> = 
    (state: RequestState = RequestsDefaultState, action: RequestAction) => {
  switch (action.type) {
    case ADD_REQUEST:
        return {
            requests: [...state.requests, action.request]
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
            })
        }
    case REMOVE_REQUEST:
        return {
            requests: state.requests.filter((req) => req.id !== action.id)
        }
    case SET_REQUESTS:
        return {
            requests: action.requests
        }
    default:
      return state;
  }
};

export { reducer as requestReducer };