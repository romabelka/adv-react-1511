import { Record } from "immutable";
import { createSelector } from "reselect";
import { appName } from "../config";
import firebaseApi from "../api/firebaseApi";

/**
 * Constants
 * */
export const moduleName = "auth";
const prefix = `${appName}/${moduleName}`;

export const SIGN_IN_SUCCESS = `${prefix}/SIGN_IN_SUCCESS`;
export const SIGN_UP_SUCCESS = `${prefix}/SIGN_UP_SUCCESS`;
export const SIGN_OUT_SUCCESS = `${prefix}/SIGN_OUT_SUCCESS`;

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
    case SIGN_OUT_SUCCESS:
      return state.set("user", null);
    default:
      return state;
  }
}

/**
 * Selectors
 * */

const localSelector = state => state[moduleName];
export const userSelector = createSelector(
  localSelector,
  state => state.user
);

export const isAuthenticated = createSelector(
  userSelector,
  state => state && state.uid
);

/**
 * Action Creators
 * */

export const init = () => dispatch => {
  firebaseApi.init().then(user => {
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    });
  });
};

export const signIn = (email, password) => dispatch =>
  firebaseApi.signIn({ email, password }).then(user =>
    dispatch({
      type: SIGN_IN_SUCCESS,
      payload: { user }
    })
  );

export const signUp = (email, password) => dispatch =>
  firebaseApi.signUp({ email, password }).then(user =>
    dispatch({
      type: SIGN_UP_SUCCESS,
      payload: { user }
    })
  );

export const signOut = () => dispatch =>
  firebaseApi.signOut().then(() =>
    dispatch({
      type: SIGN_OUT_SUCCESS
    })
  );
