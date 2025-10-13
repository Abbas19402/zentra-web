export interface IconType {
    className: string
}

export interface SidebarItem {
    key: string;
    label: string;
    type: SidebarType;
    route: string;
    hasChild: boolean;
    icon?: React.ReactElement;
    child?: SidebarItem[];
}
export type SidebarType = 'home' | 'settings';