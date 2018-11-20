import { appName } from "../config";
import { reset } from "redux-form";
import { Record, OrderedMap } from "immutable";

/**
 * Constants
 * */
export const moduleName = "people";
const prefix = `${appName}/${moduleName}`;

export const ADD_PERSON_SUCCESS = `${prefix}/ADD_PERSON_SUCCESS`;

/**
 * Reducer
 * */
export const ReducerRecord = Record({
  list: new OrderedMap({})
});

const PersonRecord = Record({
  email: null,
  firstName: null,
  lastName: null
});

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_PERSON_SUCCESS:
      console.log("STATE", state.toJS()); // to JS
      return state.setIn(
        ["list", Date.now()],
        new PersonRecord(payload.person)
      );

    default:
      return state;
  }
}

/**
 * Selectors
 * */

export function addPerson(person) {
  return dispatch => {
    dispatch({
      type: ADD_PERSON_SUCCESS,
      payload: { person }
    });
    dispatch(reset("addPerson"));
  };
}
