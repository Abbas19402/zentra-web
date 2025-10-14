import { SidebarItem } from "../types";
import { HomeIcon, MyListIcon, SubscriptionsIcon, ManageSubscriptionIcon, LikedVideosIcon, MyVideosIcon, SettingsIcon, AccountIcon, ProfileIcon  } from '@/shared/components/ui/Icons'

export const SidebarMenu: SidebarItem[] = [
    {
      key: 'home',
      label: 'Home',
      type: 'home',
      route: '/',
      hasChild: false,
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      key: 'my-list',
      label: 'My List',
      type: 'home',
      route: '/my-list',
      hasChild: false,
      icon: <MyListIcon className="w-5 h-5" />,
    },
    {
      key: 'liked-videos',
      label: 'Liked Videos',
      type: 'home',
      route: '/liked-videos',
      hasChild: false,
      icon: <LikedVideosIcon className="w-5 h-5" />,
    },
    {
      key: 'my-videos',
      label: 'My Videos',
      type: 'home',
      route: '/my-videos',
      hasChild: false,
      icon: <MyVideosIcon className="w-5 h-5" />,
    },
    {
      key: 'settings',
      label: 'Settings',
      type: 'settings',
      hasChild: true,
      icon: <SettingsIcon className="w-5 h-5" />,
      child: [
        {
          key: 'account',
          label: 'Account',
          type: 'settings',
          route: '/settings/account',
          hasChild: false,
          icon: <AccountIcon className="w-5 h-5" />,
        },
        {
          key: 'profile',
          label: 'Profile',
          type: 'settings',
          route: '/settings/profile',
          hasChild: false,
          icon: <ProfileIcon className="w-5 h-5" />,
        },
        {
          key: 'subscription',
          label: 'Subscription',
          type: 'settings',
          route: '/settings/subscription',
          hasChild: false,
          icon: <ManageSubscriptionIcon className="w-5 h-5" />,
        }
      ],
    },
  ];