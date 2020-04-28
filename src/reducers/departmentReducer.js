import { SET_DEPARTMENTS } from "../actions/types";

const initialState = {
  data: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_DEPARTMENTS:
      return {
        ...state,
        data: action.payload,
      };
    default:
      return state;
  }
}
