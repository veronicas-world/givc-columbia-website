export interface SiteLinks {
  interestForm: string;
  instagram: string;
  /** Stays null until the chapter supplies and approves its verified LinkedIn page. */
  chapterLinkedIn: string | null;
  parentSite: string;
  parentCampusChapters: string;
}

export const siteLinks: SiteLinks = {
  interestForm:
    'https://docs.google.com/forms/d/e/1FAIpQLSf8zwJ-SHjKiPGtXqvj-C72GsKEAfkaIZ9tEL99K9pkCrzs1Q/viewform?utm_source=ig&utm_medium=social&utm_content=link_in_bio',
  instagram: 'https://www.instagram.com/girlsintovc.columbia/',
  chapterLinkedIn: null,
  parentSite: 'https://www.girlsintovc.com/',
  parentCampusChapters: 'https://www.girlsintovc.com/campus-chapters',
};

export const instagramHandle = '@girlsintovc.columbia';
