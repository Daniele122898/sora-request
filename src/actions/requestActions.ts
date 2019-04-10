import axios from 'axios';
import { ADD_REQUEST, EDIT_REQUEST, REMOVE_REQUEST, 
    SET_REQUESTS, SET_FIRST_FETCH } from '../constants/index';
import { Request } from '../store/index';
import { ThunkResult } from '../types/index';

export type RequestAction = AddRequest | EditRequest 
| RemoveRequest | SetRequests | SetFirstFetch;

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

export interface SetFirstFetch {
    type: SET_FIRST_FETCH;
    firstFetch: boolean;
}

export const setFirstFetch = (firstFetch: boolean): SetFirstFetch => ({
    type: SET_FIRST_FETCH,
    firstFetch
});

export const addRequest = (request: Request): AddRequest => ({
    type: ADD_REQUEST,
    request
});

export const setRequests = (requests: Request[]): SetRequests => ({
    type: SET_REQUESTS,
    requests
});

export const startFirstFetch = (): ThunkResult<any> => {
    return (dispatch) => {
        axios.get('/api/getAllRequests')
        .then(resp => {
            // if the user has no requests we do... nothing :)
            if (resp.data.length === 0) {
                return;
            }
            // else create a Request[] and add all the data
            // basically convert it to the react type.
            const reqs: Request[] = [];
            for (let i=0; i<resp.data.length; i++) {
                const r = resp.data[i];
                reqs.push({
                    id: r.id,
                    imageUrl: r.imageUrl,
                    name: r.name,
                    rarity: r.rarity
                });
            }
            // dispatch it to update the state
            dispatch(setRequests(reqs));
        }).catch(e => {
            console.log(e);
            return;
        });
    }
};