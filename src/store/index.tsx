import { User } from "../actions/auth";

export interface ApplicationState {
    auth: AuthState
    requests: RequestState
}

export interface RequestState {
    requests: Request[];
    firstFetch: boolean;
}

export interface Request {
    name: string;
    imageUrl: string;
    rarity: number;
    id: string;
}

export interface AuthState {
    user?: User;
}