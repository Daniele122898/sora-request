export const LOGIN = 'LOGIN';
export type LOGIN = typeof LOGIN;

export const LOGOUT = 'LOGOUT';
export type LOGOUT = typeof LOGOUT;

export const ADD_REQUEST = 'ADD_REQUEST';
export type ADD_REQUEST = typeof ADD_REQUEST;

export const EDIT_REQUEST = 'EDIT_REQUEST';
export type EDIT_REQUEST = typeof EDIT_REQUEST;

export const REMOVE_REQUEST = 'REMOVE_REQUEST';
export type REMOVE_REQUEST = typeof REMOVE_REQUEST;

export const SET_REQUESTS = 'SET_REQUESTS';
export type SET_REQUESTS = typeof SET_REQUESTS;

export const GET_WAIFU_RARITIES = 'GET_WAIFU_RARITIES';
export type GET_WAIFU_RARITIES = typeof GET_WAIFU_RARITIES;

export const SET_LOGS = 'SET_LOGS';
export type SET_LOGS = typeof SET_LOGS;

export const SET_FIRST_FETCH = 'SET_FIRST_FETCH';
export type SET_FIRST_FETCH = typeof SET_FIRST_FETCH;

export const SET_NOTIFY = 'SET_NOTIFY';
export type SET_NOTIFY = typeof SET_NOTIFY;

export enum RequestState {
    Pending = 0,
    Accepted,
    Rejected
}
