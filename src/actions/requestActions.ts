import axios from 'axios';
import {
    ADD_REQUEST, EDIT_REQUEST, REMOVE_REQUEST,
    SET_REQUESTS, SET_FIRST_FETCH, SET_LOGS, SET_NOTIFY, RequestState
} from '../constants/index';
import { Request, Log } from '../store/index';
import { ThunkResult } from '../types/index';

export type RequestAction = AddRequest | EditRequest 
| RemoveRequest | SetRequests | SetFirstFetch | SetLogs | SetNotify;

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

export interface SetNotify {
    type: SET_NOTIFY;
    notifyOnWaifuRequest: boolean;
}

export const setNotify = (notifyOnWaifuRequest: boolean): SetNotify => ({
    type: SET_NOTIFY,
    notifyOnWaifuRequest
});

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

export const startSetNotify= (notify: boolean): ThunkResult<any> => {
    return async (dispatch) => {
        const resp = await axios.post('/api/setNotify', notify);
    
        if (resp.data.success) {
            dispatch(setNotify(notify));
        }
        
        return resp;
    }
}

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
            const reqs: Request[] = resp.data.filter((r: Request) => r.requestState == RequestState.Pending)
                .map((r: Request) => ({
                    id: r.id,
                    imageUrl: r.imageUrl,
                    name: r.name,
                    rarity: r.rarity,
                    requestState: r.requestState,
                }))
            // now do the same thing for the logs if they exist
            const logs: Log[] = resp.data.filter((r: Request) => r.requestState != RequestState.Pending)
                .map((r: Request) => ({
                    id: r.id,
                    accepted: r.requestState == RequestState.Accepted,
                    waifuName: r.name,
                    processedTime: new Date(r.processedTime+"Z")
                }));

            // now sort the logs by time
            logs.sort((a,b) => {
                return a.processedTime < b.processedTime ? 1 : -1;
            });

            // get the notify on request bool. This is ugly af but whatever
            axios.get('/api/getNotify')
                .then(resp => {
                    // dispatch it to update the state
                    dispatch(setRequests(reqs));
                    dispatch(setLogs(logs));
                    dispatch(setNotify(resp.data));
                    // set first fetch so we dont fetch again :)
                    dispatch(setFirstFetch(true));
                })
                .catch(e => {
                    console.error(e);
                    // dispatch it to update the state
                    dispatch(setRequests(reqs));
                    dispatch(setLogs(logs));
                    dispatch(setNotify(false));
                    // set first fetch so we dont fetch again :)
                    dispatch(setFirstFetch(true));
                });
        }).catch(e => {
            console.log(e);
            return;
        });
    }
};
