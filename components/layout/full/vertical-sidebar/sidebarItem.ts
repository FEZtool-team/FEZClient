import {
  CopyIcon,
  LayoutDashboardIcon,
  FormsIcon,
  PaperclipIcon,
} from "vue-tabler-icons";

import dashboardIcon from "~icons/material-symbols-light/dashboard-outline-rounded";
import remoteSensingIcon from "~icons/material-symbols-light/nest-remote-comfort-sensor-outline-rounded";
import climateChangeIcon from "~icons/gg/code-climate";
import settingIcon from "~icons/material-symbols-light/settings-outline";

export interface menu {
  header?: string;
  title?: string;
  icon?: any;
  iconSize?: number;
  to?: string;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
  soon?: boolean;
}

const sidebarItem: menu[] = [
  {
    title: "Dashboard",
    icon: dashboardIcon,
    to: "/",
  },
  {
    title: "Remote Sensing",
    icon: remoteSensingIcon,
    to: "/remote-sensing",
  },
  {
    title: "Climate Change",
    icon: climateChangeIcon,
    iconSize: 40,
    soon: true,
    to: "/coming-soon",
  },
  {
    title: "Setting",
    icon: settingIcon,
    iconSize: 40,
    to: "/setting",
  },
];

export default sidebarItem;
