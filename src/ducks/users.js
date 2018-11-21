import { appName } from "../config";
import { Record, OrderedMap } from "immutable";
import { reset } from "redux-form";

/**
 * Constants
 * */
export const moduleName = "addUser";
const prefix = `${appName}/${moduleName}`;

export const ADD_USER = `${prefix}/ADD_USER`;

/**
 * Reducer
 * */
const UserRecord = Record({
  email: null,
  firstName: null,
  lastName: null
});

const ReducerRecord = new Record({
  users: arrToMap([], UserRecord)
});

function arrToMap(arr, DataRecord) {
  return arr.reduce(
    (acc, item) => acc.set(item.id, DataRecord ? new DataRecord(item) : item),
    new OrderedMap()
  );
}

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;
  const index = state.users.size + 1;

  switch (type) {
    case ADD_USER:
      return state.setIn(["users", index], new UserRecord(payload.user));

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

/**
 * Action Creators
 * */
export function addUser(user) {
  return dispatch => {
    dispatch({
      type: ADD_USER,
      payload: { user }
    });
    dispatch(reset("addUser"));
  };
}
