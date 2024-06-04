import { useSelector } from "react-redux";
import Sidebar from "./Sidebar";
import useMenuItems from "../../CustomHooks/useMenuItems";

const SidebarFactory = () => {
  const { user } = useSelector((state) => state.auth);
  const { menuItems, commonMenu } = useMenuItems(user.role);

  return <Sidebar menuItems={menuItems} commonMenu={commonMenu} />;
};

export default SidebarFactory;
