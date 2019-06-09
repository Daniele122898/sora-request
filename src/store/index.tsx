import { User } from "../actions/auth";

export interface ApplicationState {
    auth: AuthState
    requests: RequestState
}

export interface RequestState {
    requests: Request[];
    logs: Log[];
    firstFetch: boolean;
}

export interface Request {
    name: string;
    imageUrl: string;
    rarity: number;
    id: string;
}

export interface Log {
    id: number;
    accepted: boolean;
    waifuName: string;
    processedTime: Date;
}

export interface AuthState {
    user?: User;
}