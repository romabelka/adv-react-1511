import { push } from "connected-react-router";

export const authMiddleware = store => next => action => {
  let result = next(action);
  const { router, auth } = store.getState();
  const path = router.location.pathname;
  // not logged for admin
  if (path === "/admin" && !auth.user) {
    store.dispatch(push("/auth/sign-in"));
  }
  // redirect from login page
  if (path === "/auth/sign-in" && auth.user) {
    store.dispatch(push("/admin"));
  }

  return result;
};
