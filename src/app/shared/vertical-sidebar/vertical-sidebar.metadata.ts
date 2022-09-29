// Sidebar route metadata
export interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
  extralink: boolean;
  label: string;
  permesion: boolean;
  labelClass: string;
  submenu: RouteInfo[];
}
