import { appName } from "../config";
import { Record } from "immutable";
import { fSignIn, fCreateUser, fOnChange } from "./firebaseService";

/**
 * Constants
 * */
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  user: null
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case SIGN_IN_SUCCESS:
    case SIGN_UP_SUCCESS:
      return state.set("user", payload.user);

    default:
      return state;
  }
}

/**
 * Selectors
 * */

/**
 * Init logic
 */

fOnChange(SIGN_IN_SUCCESS);

/**
 * Action Creators
 * */
export function signIn(email, password) {
  return dispatch =>
    fSignIn(dispatch, { email, password, type: SIGN_IN_SUCCESS });
}

export function signUp(email, password) {
  return dispatch =>
    fCreateUser(dispatch, { email, password, type: SIGN_UP_SUCCESS });
}
