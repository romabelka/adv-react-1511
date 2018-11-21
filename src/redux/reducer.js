import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducer as form } from "redux-form";
import authReducer, { moduleName as authModule } from "../ducks/auth";
import users from "../ducks/users";
import history from "../history";

export default combineReducers({
  form,
  router: connectRouter(history),
  [authModule]: authReducer,
  users
});
