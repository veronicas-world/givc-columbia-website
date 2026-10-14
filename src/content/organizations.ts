/**
 * Organizations where chapter members have gained experience. This describes
 * member experience only; none of these organizations sponsors or partners with
 * the chapter. To add one, save its logo in `public/images/organizations/`,
 * add a record here and note the logo source in `docs/asset-sources.md`.
 */
export interface RepresentedOrganization {
  id: string;
  name: string;
  logo: string;
  /** Page the logo file was taken from. */
  source: string;
  /** Optical size adjustment so wide and compact logos look balanced. 1 is the default height. */
  scale?: number;
}

export const representedOrganizations: RepresentedOrganization[] = [
  {
    id: 'blackstone',
    name: 'Blackstone',
    logo: '/images/organizations/blackstone.svg',
    source: 'https://commons.wikimedia.org/wiki/File:The_Blackstone_Group_logo_(2).svg',
    scale: 1.25,
  },
  {
    id: 'jp-morgan',
    name: 'J.P. Morgan',
    logo: '/images/organizations/jp-morgan.svg',
    source: 'https://commons.wikimedia.org/wiki/File:J_P_Morgan_Logo_2008.svg',
  },
  {
    id: 'factory',
    name: 'Factory',
    logo: '/images/organizations/factory.svg',
    source: 'https://factory.ai/',
    scale: 0.7,
  },
  {
    id: 'elliott-management',
    name: 'Elliott Management',
    logo: '/images/organizations/elliott-management.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Elliott_Management_Corporation_logo.svg',
  },
  {
    id: 'goldman-sachs',
    name: 'Goldman Sachs',
    logo: '/images/organizations/goldman-sachs.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Goldman_Sachs_2022_Black.svg',
    scale: 1.4,
  },
  {
    id: 'lightspeed-venture-partners',
    name: 'Lightspeed Venture Partners',
    logo: '/images/organizations/lightspeed-venture-partners.svg',
    source: 'https://commons.wikimedia.org/wiki/File:LSVP_Horizontal_Logo.svg',
  },
  {
    id: 'nea',
    name: 'New Enterprise Associates (NEA)',
    logo: '/images/organizations/nea.svg',
    source: 'https://commons.wikimedia.org/wiki/File:New_Enterprise_Associates_Logo.svg',
    scale: 1.2,
  },
  {
    id: 'general-catalyst',
    name: 'General Catalyst',
    logo: '/images/organizations/general-catalyst.svg',
    source: 'https://commons.wikimedia.org/wiki/File:General_Catalyst_Logo.svg',
    scale: 1,
  },
  {
    id: 'exceptional-capital',
    name: 'Exceptional Capital',
    logo: '/images/organizations/exceptional-capital.png',
    source: 'https://www.exceptionalcap.com/',
    scale: 0.85,
  },
  {
    id: 'kkr',
    name: 'KKR',
    logo: '/images/organizations/kkr.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Kohlberg_Kravis_Roberts_(logo).svg',
    scale: 0.9,
  },
  {
    id: 'towerbrook',
    name: 'TowerBrook',
    logo: '/images/organizations/towerbrook.svg',
    source: 'https://commons.wikimedia.org/wiki/File:TowerBrook_Capital_Partners_(logo).svg',
    scale: 0.7,
  },
  {
    id: 'brookfield',
    name: 'Brookfield',
    logo: '/images/organizations/brookfield.svg',
    source: 'https://commons.wikimedia.org/wiki/File:Brookfield_Asset_Management_logo.svg',
    scale: 0.75,
  },
  {
    id: 'fox-sports',
    name: 'Fox Sports',
    logo: '/images/organizations/fox-sports.svg',
    source: 'https://commons.wikimedia.org/wiki/File:FOX_Sports_2022.svg',
    scale: 1.4,
  },
  {
    id: 'newyork-presbyterian',
    name: 'NewYork-Presbyterian',
    logo: '/images/organizations/newyork-presbyterian.svg',
    source: 'https://www.nyp.org/',
    scale: 1.8,
  },
];
