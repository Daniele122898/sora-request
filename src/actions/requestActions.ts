import { ADD_REQUEST, EDIT_REQUEST, REMOVE_REQUEST, SET_REQUESTS } from '../constants/index';
import { Request } from '../store/index';
import { AnyAction } from 'redux';

export type RequestAction = AddRequest | EditRequest | RemoveRequest | SetRequests;

export interface AddRequest {
    type: ADD_REQUEST;
    request: Request;
}

export interface EditRequest {
    type: EDIT_REQUEST;
    request: Request;
}

export interface RemoveRequest {
    type: REMOVE_REQUEST;
    id: string;
}

export interface SetRequests {
    type: SET_REQUESTS;
    requests: Request[];
}