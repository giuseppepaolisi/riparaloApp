// hooks/useMenuItems.js
import {
  faTachometerAlt,
  faUsers,
  faHandshake,
  faCogs,
  faShapes,
  faMapMarkerAlt,
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

  const commonMenu = [
    { path: "/about-us", label: "Sedi e contatti", icon: faMapMarkerAlt }, // Nuova voce
  ];

  let menuItems = [];
  switch (role) {
    case "admin":
      menuItems = adminMenu;
      break;
    case "partner":
      menuItems = partnerMenu;
      break;
    case "tecnico":
      menuItems = tecnicoMenu;
      break;
    default:
      menuItems = [];
  }

  return { menuItems, commonMenu };
};

export default useMenuItems;
