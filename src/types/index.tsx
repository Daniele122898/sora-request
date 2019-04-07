import { ThunkDispatch, ThunkAction } from "redux-thunk";
import { AnyAction } from 'redux';
import { ApplicationState } from '../store/index';

export type AnyThunkDispatch<RootState> = ThunkDispatch<RootState, undefined, any>;

export type ThunkResult<R> = ThunkAction<R, ApplicationState, undefined, AnyAction>;
