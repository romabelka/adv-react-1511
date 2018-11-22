import firebase from "firebase/app";

const fOnChange = type => {
  firebase.auth().onAuthStateChanged(user => {
    window.store.dispatch({
      type,
      payload: { user }
    });
  });
};

const fSignIn = (dispatch, { email, password, type }) => {
  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(user =>
      dispatch({
        type,
        payload: { user }
      })
    );
};

const fCreateUser = (dispatch, { email, password, type }) => {
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user =>
      dispatch({
        type,
        payload: { user }
      })
    );
};

export { fOnChange, fSignIn, fCreateUser };
