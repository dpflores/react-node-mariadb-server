import {
  HiOutlineViewGrid,
  HiOutlineCube,
  HiOutlineShoppingCart,
  HiOutlineUsers,
  HiOutlineDocumentText,
  HiOutlineAnnotation,
  HiOutlineQuestionMarkCircle,
  HiOutlineCog,
} from "react-icons/hi";

import { MdCalendarMonth } from "react-icons/md";

import { AiOutlineLineChart } from "react-icons/ai";

export const DASHBOARD_SIDEBAR_LINKS = [
  {
    key: "sistema",
    label: "Estatus de Sistema",
    path: "/",
    icon: <HiOutlineViewGrid />,
  },
  {
    key: "mensual1",
    label: "Estatus Mensual 1",
    path: "/mensual1",
    icon: <MdCalendarMonth />,
  },
  {
    key: "mensual2",
    label: "Estatus Mensual 2",
    path: "/mensual2",
    icon: <MdCalendarMonth />,
  },
  {
    key: "operation",
    label: "Estatus de Operación",
    path: "/operation",
    icon: <AiOutlineLineChart />,
  },
];

export const DASHBOARD_SIDEBAR_BOTTOM_LINKS = [
  {
    key: "settings",
    label: "Settings",
    path: "/settings",
    icon: <HiOutlineCog />,
  },
  {
    key: "support",
    label: "Help & Support",
    path: "/support",
    icon: <HiOutlineQuestionMarkCircle />,
  },
];
