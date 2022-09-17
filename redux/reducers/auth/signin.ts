import { Reducer } from "redux";
import {
  AuthActionState,
  SIGNIN,
  SIGNIN_ERROR,
  SIGNIN_SUCCESS,
} from "../../actions/actionTypes";

let registered;
if (typeof window !== "undefined") {
  registered = localStorage.getItem("hasBeenAuthenticated") || "";
}

const initialState: AuthActionState = {
  loading: false,
  data: {
    status: 0,
    data: {
      message: "",
    },
  },
  error: {
    status: false,
    data: {
      data: {
        message: "",
      },
    },
  },
  register: registered ? true : false,
};

export const signin: Reducer<AuthActionState> = (
  state = initialState,
  action
) => {
  switch (action.type) {
    case SIGNIN:
      return {
        ...state,
        loading: true,
      };
    case SIGNIN_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        register: true,
      };
    case SIGNIN_ERROR:
      return {
        ...state,
        loading: false,
        error: { ...state.error, status: true, data: action.payload },

        register: false,
      };
    default:
      return state;
  }
};
