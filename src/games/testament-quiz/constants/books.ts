import type { BibleBook } from '../types';

export const BIBLE_BOOKS: BibleBook[] = [
  { name: 'Genesis', testament: 'old', description: 'The book of beginnings' },
  { name: 'Exodus', testament: 'old', description: 'The departure from Egypt' },
  { name: 'Matthew', testament: 'new', description: 'The first Gospel' },
  { name: 'John', testament: 'new', description: 'The Gospel of love' },
  { name: 'Psalms', testament: 'old', description: 'Book of prayers and praise' },
  { name: 'Romans', testament: 'new', description: 'Paul\'s letter to Rome' },
  { name: 'Isaiah', testament: 'old', description: 'Major prophet' },
  { name: 'Revelation', testament: 'new', description: 'The final book' },
  // Add more books as needed
];