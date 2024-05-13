export const saveStateMiddleware = (store) => (next) => (action) => {
  const result = next(action);
  if (action.type === "LOGIN") {
    localStorage.setItem("user", JSON.stringify(store.getState().auth.user));
  } else if (action.type === "LOGOUT") {
    localStorage.removeItem("user");
  }
  return result;
};
