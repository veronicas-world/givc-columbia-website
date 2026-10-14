export interface NavItem {
  label: string;
  path: string;
}

export const navItems: NavItem[] = [
  { label: 'About', path: '/about' },
  { label: 'People', path: '/people' },
  { label: 'Contact', path: '/contact' },
];
