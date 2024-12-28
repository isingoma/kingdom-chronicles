import { BibleStory } from '../types';

export const BIBLE_STORIES: BibleStory[] = [
  {
    id: 'david-goliath',
    title: 'David and Goliath',
    description: 'A young shepherd defeats a giant warrior with just a sling and stone',
    scripture: '1 Samuel 17',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'David and Goliath',
      'Samson and Delilah',
      'Moses Parting the Red Sea',
      'Joshua and the Battle of Jericho'
    ],
    devotional: 'With God\'s help, even the smallest among us can overcome the greatest challenges.'
  },
  {
    id: 'noahs-ark',
    title: 'Noah\'s Ark',
    description: 'A righteous man builds a massive boat to save animals from a worldwide flood',
    scripture: 'Genesis 6-9',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1578465436135-d36a97e060ee?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Noah\'s Ark',
      'Jonah and the Whale',
      'Jesus Calms the Storm',
      'Peter Walks on Water'
    ],
    devotional: 'God rewards faithfulness and provides a way of salvation for those who trust in Him.'
  },
  {
    id: 'daniel-lions',
    title: 'Daniel in the Lions\' Den',
    description: 'A faithful servant of God is protected from hungry lions',
    scripture: 'Daniel 6',
    difficulty: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1585468274952-0b9599b416c3?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Daniel in the Lions\' Den',
      'Samson Fights the Lion',
      'David Protects His Sheep',
      'Elijah Fed by Ravens'
    ],
    devotional: 'God protects those who remain faithful to Him, even in the face of danger.'
  }
];