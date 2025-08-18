import { combineReducers } from "redux";
import { loadingBarReducer } from "react-redux-loading-bar";
import authedUser from "./autherUser";
import users from "./users";
import questions from "./questions";

export default combineReducers({
  authedUser,
  users,
  questions,
  loadingBar: loadingBarReducer,
});
