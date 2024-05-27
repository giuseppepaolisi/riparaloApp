import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";

import Sidebar from "./Sidebar";

const SidebarFactory = () => {
  const { user } = useSelector((state) => state.auth);

  switch (user.role) {
    case "admin":
      return <Sidebar />;
    case "tecnico":
      return <Sidebar />;
    case "partner":
      return <Sidebar />;
    default:
      return <Outlet />;
  }
};

export default SidebarFactory;
