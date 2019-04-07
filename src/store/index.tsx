import { User } from "../actions/auth";

export interface ApplicationState {
    auth: AuthState
}

export interface AuthState {
    user?: User;
}