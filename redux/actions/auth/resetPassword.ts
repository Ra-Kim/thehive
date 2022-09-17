import axios, { AxiosResponse } from "axios";
import { FieldValues } from "react-hook-form";
import config from "../../../config";
import useAxios from "../../../hooks/UseAxios";
import { AppDispatch } from "../../store/store";
import {
  RESET_PASSWORD,
  RESET_PASSWORD_ERROR,
  RESET_PASSWORD_SUCCESS,
} from "../actionTypes";

const resetPassword = () => ({
  type: RESET_PASSWORD,
});

const resetPasswordSuccess = (data: AxiosResponse) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: data,
});

const resetPasswordError = (error: AxiosResponse) => ({
  type: RESET_PASSWORD_ERROR,
  payload: error,
});

export const handleresetPassword =
  (token: string, body: FieldValues) => async (dispatch: AppDispatch) => {
    dispatch(resetPassword());
    try {
      const response = await useAxios({
        method: "PUT",
        url: `${config.API_BASE_URL}/v1/auth/reset-password/${token}`,
        data: body,
      });
      console.log(response);
      dispatch(resetPasswordSuccess(response));
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        dispatch(resetPasswordError(error.response));
      } else console.log(String(error), "error");
    }
  };
