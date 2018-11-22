import { appName } from "../config";
import { Record } from "immutable";

/**
 * Constants
 * */
export const moduleName = "users";
const prefix = `${appName}/${moduleName}`;

export const ADD_USER_SUCCESS = `${prefix}/ADD_USER_SUCCESS`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  users: []
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER_SUCCESS:
      return state.set("users", [...state.users, payload]);

    default:
      return state;
  }
}

/**
 * Action Creators
 * */
export function addUser(email, firstName, lastName) {
  return {
    type: ADD_USER_SUCCESS,
    payload: { email, firstName, lastName }
  };
}
