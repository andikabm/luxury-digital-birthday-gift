export interface GalleryItem {
  id: string;
  url: string;
  title: string;
  caption: string;
  date?: string;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface GiftConfig {
  recipientName: string;
  senderName: string;
  greetingTitle: string;
  greetingSubtitle: string;
  nextBirthdayDate: string; // ISO date string e.g. "2027-05-18T00:00:00"
  letterTitle: string;
  letterBody: string;
  closingQuote: string;
  videoUrl: string;
  videoPoster: string;
  photos: GalleryItem[];
  bgMusicUrl?: string;
  bgMusicPreset: 'romantic-piano' | 'lullaby' | 'celestial';
}
