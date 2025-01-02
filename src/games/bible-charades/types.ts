// Add to existing types
export interface StoryImage {
  url: string;
  alt: string;
}

export interface BibleStory {
  id: string;
  title: string;
  description: string;
  scripture: string;
  difficulty: string;
  images: StoryImage[];
  fallbackDescription: string;
  options: string[];
  devotional: string;
}