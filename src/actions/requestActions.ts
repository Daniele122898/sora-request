import axios from 'axios';
import { ADD_REQUEST, EDIT_REQUEST, REMOVE_REQUEST, 
    SET_REQUESTS, SET_FIRST_FETCH, SET_LOGS } from '../constants/index';
import { Request, Log } from '../store/index';
import { ThunkResult } from '../types/index';

export type RequestAction = AddRequest | EditRequest 
| RemoveRequest | SetRequests | SetFirstFetch | SetLogs;

export interface SetLogs {
    type: SET_LOGS;
    logs: Log[];
}

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

export const setLogs = (logs: Log[]): SetLogs => ({
    type: SET_LOGS,
    logs
});

export const editRequest = (request: Request): EditRequest => ({
    type: EDIT_REQUEST,
    request
});

export const startFirstFetch = (): ThunkResult<any> => {
    return (dispatch) => {
        axios.get('/api/getAllRequests')
        .then(resp => {
            // if the user has no requests we do... nothing :)
            if (resp.data == null) {
                return;
            }
            // else create a Request[] and add all the data
            // basically convert it to the react type.
            if (resp.data.waifuRequests != undefined) {
                const reqs: Request[] = [];
                for (let i=0; i<resp.data.waifuRequests.length; i++) {
                    const r = resp.data.waifuRequests[i];
                    reqs.push({
                        id: r.id,
                        imageUrl: r.imageUrl,
                        name: r.name,
                        rarity: r.rarity
                    });
                }
            }
            // now do the same thing for the logs if they exist
            if (resp.data.requestLogs != undefined) {
                const logs: Log[] = [];
                for (let i = 0; i<resp.data.requestLogs.length; i++) {
                    const l = resp.data.requestLogs[i];
                    logs.push({
                        id: l.id,
                        accepted: l.accepted,
                        waifuName: l.waifuName,
                        processedTime: new Date(l.processedTime+"Z")
                    });
                }
            }
            // dispatch it to update the state
            dispatch(setRequests(reqs));
            dispatch(setLogs(logs));
            // set first fetch so we dont fetch again :)
            dispatch(setFirstFetch(true));
        }).catch(e => {
            console.log(e);
            return;
        });
    }
};