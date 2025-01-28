import { BibleStory } from '../types';

export const BIBLE_STORIES: BibleStory[] = [
  // EASY STORIES (50)
  {
    id: 'creation',
    title: 'The Creation Story',
    description: 'God creates the world in six days and rests on the seventh',
    scripture: 'Genesis 1-2',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1920&auto=format&fit=crop',
    options: [
      'The Creation Story',
      'Noah\'s Flood',
      'The Tower of Babel',
      'The Garden of Eden'
    ],
    devotional: 'God\'s power and creativity are displayed in all of creation.'
  },
  {
    id: 'adam-eve',
    title: 'Adam and Eve',
    description: 'The first humans disobey God and eat the forbidden fruit',
    scripture: 'Genesis 3',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Adam and Eve',
      'Cain and Abel',
      'Abraham and Sarah',
      'Isaac and Rebekah'
    ],
    devotional: 'Sin has consequences, but God provides a way of redemption.'
  },
  {
    id: 'cain-abel',
    title: 'Cain and Abel',
    description: 'Two brothers bring offerings to God with very different outcomes',
    scripture: 'Genesis 4',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1533000971552-6a962ff0b9f9?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Cain and Abel',
      'Jacob and Esau',
      'Moses and Aaron',
      'David and Jonathan'
    ],
    devotional: 'God desires sincere worship from a pure heart.'
  },
  // Continue with more easy stories...

  // MEDIUM STORIES (50)
  {
    id: 'abraham-sacrifice',
    title: 'Abraham\'s Test',
    description: 'Abraham is asked to sacrifice his son Isaac as a test of faith',
    scripture: 'Genesis 22',
    difficulty: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1533000971552-6a962ff0b9f9?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Abraham\'s Test',
      'Jephthah\'s Vow',
      'The Binding of Isaac',
      'The Sacrifice of Samuel'
    ],
    devotional: 'True faith means trusting God even when we don\'t understand His plan.'
  },
  {
    id: 'joseph-dreams',
    title: 'Joseph\'s Dreams',
    description: 'A young man\'s dreams lead to jealousy from his brothers',
    scripture: 'Genesis 37',
    difficulty: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1533000971552-6a962ff0b9f9?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Joseph\'s Dreams',
      'Daniel\'s Visions',
      'Jacob\'s Ladder',
      'Pharaoh\'s Dreams'
    ],
    devotional: 'God can use difficult circumstances to fulfill His greater purpose.'
  },
  // Continue with more medium stories...

  // HARD STORIES (50)
  {
    id: 'melchizedek',
    title: 'Melchizedek Blesses Abraham',
    description: 'A mysterious priest-king blesses Abraham after battle',
    scripture: 'Genesis 14:17-20',
    difficulty: 'hard',
    imageUrl: 'https://images.unsplash.com/photo-1533000971552-6a962ff0b9f9?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Melchizedek Blesses Abraham',
      'Aaron Blesses Israel',
      'Samuel Anoints David',
      'Eli Blesses Hannah'
    ],
    devotional: 'Christ\'s priesthood is eternal, like Melchizedek\'s.'
  },
  {
    id: 'urim-thummim',
    title: 'The Urim and Thummim',
    description: 'Sacred lots used by the high priest to determine God\'s will',
    scripture: 'Exodus 28:30',
    difficulty: 'hard',
    imageUrl: 'https://images.unsplash.com/photo-1533000971552-6a962ff0b9f9?q=80&w=1920&auto=format&fit=crop',
    options: [
      'The Urim and Thummim',
      'The Ark of the Covenant',
      'The Golden Censer',
      'The Bronze Serpent'
    ],
    devotional: 'God provides ways to know His will and guidance.'
  }
  // Continue with more hard stories...
];

// Helper function to get stories by difficulty
export const getStoriesByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): BibleStory[] => {
  return BIBLE_STORIES.filter(story => story.difficulty === difficulty);
};

// Helper function to get random stories
export const getRandomStories = (count: number, difficulty?: 'easy' | 'medium' | 'hard'): BibleStory[] => {
  const availableStories = difficulty ? getStoriesByDifficulty(difficulty) : BIBLE_STORIES;
  const shuffled = [...availableStories].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};
