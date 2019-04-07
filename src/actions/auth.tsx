import { AnyAction } from "redux";
import { ThunkResult } from '../types'
import axios, { AxiosPromise } from 'axios';
import * as constants from '../constants';

export interface Login {
  type: constants.LOGIN;
  user: User;
}

export interface User {
  id: string;
  username: string;
  avatar: string;
  discriminator: string;
}

export interface Logout {
  type: constants.LOGOUT;
}

export type AuthAction = Login | Logout;

export const login = (user: User): Login => ({
  type: constants.LOGIN,
  user
});

export const startLogin = (): ThunkResult<AxiosPromise<any>> => {
  return (): AxiosPromise<any> => {
    return axios.get('/api/checkLogin');
  };
};

export const logout = () : Logout => ({
  type: constants.LOGOUT
});

export const startLogout = (): ThunkResult<any> =>  {
  return (dispatch) => {
    // first logout in react then redirect to logout on the backend
    dispatch(logout);
    // now redirect
    window.location.href = '/logout';
  };
  
};