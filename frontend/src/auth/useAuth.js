import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "./authActions";

export const useAuth = () => {
  const user = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  const loginHandler = (user) => {
    dispatch(login(user));
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return {
    user,
    login: loginHandler,
    logout: logoutHandler,
  };
};
