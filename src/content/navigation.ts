export interface NavItem {
  label: string;
  path: string;
}

export const navItems: NavItem[] = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'People', path: '/people' },
  { label: 'Resources', path: '/resources' },
  { label: 'Contact', path: '/contact' },
];
