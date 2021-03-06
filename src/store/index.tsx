import { User } from "../actions/auth";

export interface ApplicationState {
    auth: AuthState
    requests: RequestState
}

export interface RequestState {
    requests: Request[];
    logs: Log[];
    firstFetch: boolean;
    notifyOnWaifuRequest: boolean;
    rarities: WaifuRarity[];
}

export interface Request {
    name: string;
    imageUrl: string;
    rarity: number;
    id: string;
    requestState?: number;
    processedTime?: string;
    rejectReason?: string;
}

export interface WaifuRarity {
    name: string;
    value: number;
    interpolationGuideline: string;
}

export interface Log {
    id: number;
    accepted: boolean;
    waifuName: string;
    processedTime: Date;
    imageUrl: string;
    rejectReason?: string;
}

export interface AuthState {
    user?: User;
}
