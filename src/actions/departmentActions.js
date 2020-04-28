import { SET_DEPARTMENTS, GET_ERRORS } from "./types";
import axios from "axios";
import API from "../config/keys";

export const getAllDepartments = () => async (dispatch) => {
  try {
    const res = await axios.get(`${API}/department/all`);
    dispatch({
      type: SET_DEPARTMENTS,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};
