import type { BibleVerse } from '../types';

export const BIBLE_VERSES: BibleVerse[] = [
  {
    reference: 'John 3:16',
    text: 'For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life.',
    book: 'John',
    chapter: 3,
    verse: 16,
    options: [
      'John 3:16',
      'Romans 5:8',
      'John 3:17',
      'Romans 6:23'
    ]
  },
  {
    reference: 'Psalm 23:1',
    text: 'The Lord is my shepherd, I lack nothing.',
    book: 'Psalms',
    chapter: 23,
    verse: 1,
    options: [
      'Psalm 23:1',
      'Psalm 23:2',
      'Psalm 22:1',
      'Psalm 24:1'
    ]
  },
  {
    reference: 'Genesis 1:1',
    text: 'In the beginning God created the heavens and the earth.',
    book: 'Genesis',
    chapter: 1,
    verse: 1,
    options: [
      'Genesis 1:1',
      'John 1:1',
      'Exodus 1:1',
      'Genesis 1:2'
    ]
  }
];