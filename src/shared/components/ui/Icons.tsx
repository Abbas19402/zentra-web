import { IconType } from '@/shared/types';
import React from 'react';

export const HomeIcon: React.FC<Partial<IconType>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
  </svg>
);

export const MyListIcon: React.FC<Partial<IconType>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M14 10H2v2h12v-2zm0-4H2v2h12V6zm4 8v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zM2 16h8v-2H2v2z" />
  </svg>
);

export const SubscriptionsIcon: React.FC<Partial<IconType>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
  <rect x="3" y="4" width="18" height="14" rx="2" ry="2"/>
  <path d="M8 22h8"/>
  <path d="M12 10l4 2-4 2V10z"/>
</svg>
);

export const LikedVideosIcon: React.FC<Partial<IconType>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.53-.44 1.84-1.1l3.02-5.04c.15-.25.22-.52.22-.82v-2.01z" />
  </svg>
);

export const MyVideosIcon: React.FC<Partial<IconType>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4z" />
  </svg>
);

export const SettingsIcon: React.FC<Partial<IconType>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.43 12.98c.04-.32.07-.64.07-.98s-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.12-.22-.39-.3-.61-.22l-2.49 1c-.52-.4-1.08-.73-1.69-.99l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.5.44l-.38 2.65c-.61.26-1.17.59-1.69.99l-2.49-1c-.22-.09-.49 0-.61.22l-2 3.46c-.12.22-.07.49.12.64l2.11 1.65c-.04.32-.07.64-.07.98s.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.12.22.39.3.61.22l2.49-1c.52.4 1.08.73 1.69.99l.38 2.65c.04.26.25.44.5.44h4c.25 0 .46-.18.5-.44l.38-2.65c.61-.26 1.17-.59 1.69-.99l2.49 1c.22.09.49 0 .61-.22l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zM12 15.5c-1.93 0-3.5-1.57-3.5-3.5s1.57-3.5 3.5-3.5 3.5 1.57 3.5 3.5-1.57 3.5-3.5 3.5z" />
  </svg>
);



export const Hamburger:React.FC<Partial<IconType>> = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-hidden="true">
  <g fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
    <path d="M3 6h18"/>
    <path d="M3 12h18"/>
    <path d="M3 18h18"/>
  </g>
</svg>
)

export const AccountIcon: React.FC<Partial<IconType>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
  </svg>
);

export const ProfileIcon: React.FC<Partial<IconType>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 4.5C7.52 4.5 4 8.02 4 12.5c0 3.79 2.04 7.15 5.12 8.5C9.48 21.1 9.71 21 10 21h4c.29 0 .52.1.88-.09C17.96 19.65 20 16.29 20 12.5c0-4.48-3.52-8-8-8zm0 2c1.93 0 3.5 1.57 3.5 3.5S13.93 14 12 14s-3.5-1.57-3.5-3.5S10.07 6.5 12 6.5zm-5.74 13.84c-1.92-1.38-3.26-3.7-3.26-6.84 0-3.41 2.47-6.27 5.75-6.84C8.75 6.64 10.38 7 12 7s3.25-.36 4.25-1.04c3.28.57 5.75 3.43 5.75 6.84 0 3.14-1.34 5.46-3.26 6.84.09.05.18.11.27.16 1.83.99 3.01 2.37 3.23 3.92.05.35-.18.42-.32.42H4.57c-.14 0-.37-.07-.32-.42.22-1.55 1.4-2.93 3.23-3.92-.09-.05-.18-.11-.27-.16z" />
  </svg>
);

export const ManageSubscriptionIcon: React.FC<Partial<IconType>> = (props) => (
  <svg {...props} fill="currentColor" viewBox="0 0 24 24">
    <path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4V8h16v10zm-2-7H6v-2h12v2zm-2 4H8v-2h8v2z" />
  </svg>
);

interface ChevronToggleIconProps extends Partial<IconType> {
  isOpen: boolean;
}
export const ChevronToggleIcon: React.FC<ChevronToggleIconProps> = ({ isOpen, className, ...props }) => (
  <svg
    {...props}
    className={`${className || ''} transition-transform duration-200 ease-in-out ${
      isOpen ? 'rotate-90' : 'rotate-0'
    }`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" />
  </svg>
);

export const LoadingIcon: React.FC<IconType> = (props) => {
  return <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    width="100%"
    height="100%"
    role="img"
    aria-label="Loading"
  >
    <title>Loading</title>
  
    <g><circle
        cx="25"
        cy="25"
        r="20"
        fill="none"
        stroke="currentColor"
        stroke-width="4"
        stroke-linecap="round"
        stroke-dasharray="31.4 125.6"
      />
    </g>
  </svg>
}

export const DeleteIcon: React.FC<IconType> = (props) => {
  return <svg {...props} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"></path></svg>
}

export const MoreVertIcon: React.FC<IconType> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    height="24px" 
    viewBox="0 0 24 24" 
    width="24px" 
    fill="currentColor" 
    {...props}
  >
    <path d="M0 0h24v24H0V0z" fill="none"/>
    <path d="M12 8c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm0 2c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"/>
  </svg>
);