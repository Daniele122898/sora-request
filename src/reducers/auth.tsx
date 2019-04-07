import { Reducer } from "redux";
import { AuthAction } from "../actions/auth";
import { LOGIN, LOGOUT } from "../constants";
import { AuthState } from "../store";

const reducer: Reducer<AuthState> = (state: AuthState = {}, action: AuthAction) => {
  switch (action.type) {
    case LOGIN:
      return {
        user: action.user
      };
    case LOGOUT:
      return {};
    default:
      return state;
  }
};

export { reducer as authReducer };