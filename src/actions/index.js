import * as types from "./types";
import axios from "axios";

export const handleChange = data => {
  return {
    type: types.HANDLE_CHANGE,
    data
  };
};

export const handleSubmit = data => {
  console.log("Inside handlesubmit method");
  return dispatch => {
    axios.defaults.withCredentials = true;
    console.log("data", data);
    return axios.post("http://localhost:3001/Login", data).then(response => {
      if (response.data === "Failure") {
        console.log("Login unsuccesful!");
        dispatch(loginFailure());
      } else {
        console.log("Login Successful!");
        dispatch(loginSuccess(response.data));
      }
    });
  };
};

export const loginSuccess = data => {
  return {
    type: types.LOGIN_SUCCESS,
    data
  };
};

export const loginFailure = data => {
  return {
    type: types.LOGIN_FAILURE,
    data
  };
};
