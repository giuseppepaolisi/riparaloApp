// hooks/useMenuItems.js
import {
  faTachometerAlt,
  faUsers,
  faHandshake,
  faCogs,
  faShapes,
} from "@fortawesome/free-solid-svg-icons";

const useMenuItems = (role) => {
  const adminMenu = [
    { path: "/admin-dashboard", label: "Dashboard", icon: faTachometerAlt },
    { path: "/partner", label: "Partner", icon: faHandshake },
    { path: "/tecnici", label: "Tecnici", icon: faCogs },
    { path: "/modelli", label: "Modelli", icon: faShapes },
  ];

  const partnerMenu = [
    { path: "/partner-dashboard", label: "Dashboard", icon: faTachometerAlt },
    { path: "/clienti", label: "Clienti", icon: faUsers },
  ];

  const tecnicoMenu = [
    { path: "/tecnico-dashboard", label: "Dashboard", icon: faTachometerAlt },
  ];

  switch (role) {
    case "admin":
      return adminMenu;
    case "partner":
      return partnerMenu;
    case "tecnico":
      return tecnicoMenu;
    default:
      return [];
  }
};

export default useMenuItems;
