// hooks/useMenuItems.js
import {
  faTachometerAlt,
  faUsers,
  faHandshake,
  faCogs,
  faShapes,
  faMapMarkerAlt,
  faTicketAlt,
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
    { path: "/tickets-accettati", label: "My Tickets", icon: faTicketAlt },
  ];

  const commonMenu = [];

  let menuItems = [];
  switch (role) {
    case "admin":
      menuItems = adminMenu;
      break;
    case "partner":
      menuItems = partnerMenu;
      commonMenu.push({
        path: "/about-us",
        label: "Sedi e contatti",
        icon: faMapMarkerAlt,
      }); // Aggiungi "Sedi e contatti" solo per il partner
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
