import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import dataReducer from "./dataReducer";
import departmentReducer from "./departmentReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  data: dataReducer,
  departments: departmentReducer,
});
