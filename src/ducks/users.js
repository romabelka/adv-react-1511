import { Set } from "immutable";
import { reset } from "redux-form";
import { createSelector } from "reselect";
import { appName } from "../config";

/**
 * Constants
 * */
export const moduleName = "users";
const prefix = `${appName}/${moduleName}`;

export const ADD_USER = `${prefix}/ADD_USER`;

/**
 * Reducer
 * */
export const ReducerRecord = Set;

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_USER:
      return state.add({ ...payload });

    default:
      return state;
  }
}

/**
 * Selectors
 * */

const localSelector = state => state[moduleName];
export const usersSelector = createSelector(
  localSelector,
  state => state
);

/**
 * Action Creators
 * */
export const addUser = ({ username, email, password }) => dispatch => {
  dispatch(reset("addUser"));
  dispatch({
    type: ADD_USER,
    payload: { username, email, password }
  });
};
