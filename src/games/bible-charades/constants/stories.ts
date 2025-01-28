import { BibleStory } from '../types';

export const BIBLE_STORIES: BibleStory[] = [
  // Easy Difficulty Stories
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
    id: 'creation',
    title: 'The Creation Story',
    description: 'God creates the world in six days and rests on the seventh.',
    scripture: 'Genesis 1-2',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'The Creation Story',
      'Adam and Eve',
      'The Tower of Babel',
      'The Garden of Eden'
    ],
    devotional: 'God is the creator of all things, and His creation is good.'
  },
  {
    id: 'adam-eve',
    title: 'Adam and Eve',
    description: 'The first man and woman live in the Garden of Eden until they disobey God.',
    scripture: 'Genesis 3',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Adam and Eve',
      'The Creation Story',
      'Cain and Abel',
      'The Flood'
    ],
    devotional: 'Obedience to God brings blessings, while disobedience leads to consequences.'
  },
  {
    id: 'cain-abel',
    title: 'Cain and Abel',
    description: 'The first brothers, whose offerings to God lead to jealousy and tragedy.',
    scripture: 'Genesis 4',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Cain and Abel',
      'Adam and Eve',
      'Noah\'s Ark',
      'The Tower of Babel'
    ],
    devotional: 'God desires a sincere heart in our worship and actions.'
  },
  {
    id: 'jonah-whale',
    title: 'Jonah and the Whale',
    description: 'A prophet tries to run from God but is swallowed by a great fish.',
    scripture: 'Jonah 1-2',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Jonah and the Whale',
      'Noah\'s Ark',
      'Jesus Calms the Storm',
      'Peter Walks on Water'
    ],
    devotional: 'God\'s mercy is available to all who repent and turn back to Him.'
  },
  {
    id: 'moses-burning-bush',
    title: 'Moses and the Burning Bush',
    description: 'God speaks to Moses through a burning bush and calls him to lead His people.',
    scripture: 'Exodus 3',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Moses and the Burning Bush',
      'The Ten Commandments',
      'The Parting of the Red Sea',
      'The Plagues of Egypt'
    ],
    devotional: 'God calls us to trust Him, even when His plans seem impossible.'
  },
  {
    id: 'ten-commandments',
    title: 'The Ten Commandments',
    description: 'God gives Moses the Ten Commandments on Mount Sinai.',
    scripture: 'Exodus 20',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'The Ten Commandments',
      'Moses and the Burning Bush',
      'The Parting of the Red Sea',
      'The Golden Calf'
    ],
    devotional: 'God\'s laws are given to guide us and bring us closer to Him.'
  },
  {
    id: 'ruth-naomi',
    title: 'Ruth and Naomi',
    description: 'A loyal daughter-in-law stays with her mother-in-law and finds redemption.',
    scripture: 'Ruth 1-4',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Ruth and Naomi',
      'Esther Saves Her People',
      'The Prodigal Son',
      'The Good Samaritan'
    ],
    devotional: 'Loyalty and faithfulness are rewarded by God.'
  },
  {
    id: 'birth-jesus',
    title: 'The Birth of Jesus',
    description: 'Jesus is born in Bethlehem, fulfilling prophecies of the Messiah.',
    scripture: 'Luke 2',
    difficulty: 'easy',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'The Birth of Jesus',
      'The Wise Men',
      'The Shepherds',
      'The Annunciation'
    ],
    devotional: 'God sent His Son to bring hope and salvation to the world.'
  },

  // Medium Difficulty Stories
  {
    id: 'tower-babel',
    title: 'The Tower of Babel',
    description: 'People attempt to build a tower to reach heaven, but God confuses their language.',
    scripture: 'Genesis 11',
    difficulty: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'The Tower of Babel',
      'Noah\'s Ark',
      'The Call of Abraham',
      'Jacob\'s Ladder'
    ],
    devotional: 'God opposes human pride and seeks humility and obedience.'
  },
  {
    id: 'call-abraham',
    title: 'The Call of Abraham',
    description: 'God calls Abraham to leave his home and promises to make him a great nation.',
    scripture: 'Genesis 12',
    difficulty: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'The Call of Abraham',
      'The Tower of Babel',
      'Isaac and Rebekah',
      'Jacob and Esau'
    ],
    devotional: 'Faith in God\'s promises leads to blessings beyond measure.'
  },
  {
    id: 'jacobs-ladder',
    title: 'Jacob\'s Ladder',
    description: 'Jacob dreams of a ladder reaching to heaven, with angels ascending and descending.',
    scripture: 'Genesis 28',
    difficulty: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Jacob\'s Ladder',
      'The Call of Abraham',
      'Jacob and Esau',
      'Joseph\'s Dreams'
    ],
    devotional: 'God is always with us, even in our dreams and journeys.'
  },
  {
    id: 'plagues-egypt',
    title: 'The Plagues of Egypt',
    description: 'God sends ten plagues to convince Pharaoh to free the Israelites.',
    scripture: 'Exodus 7-12',
    difficulty: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'The Plagues of Egypt',
      'The Parting of the Red Sea',
      'The Ten Commandments',
      'The Burning Bush'
    ],
    devotional: 'God\'s power is greater than any earthly ruler.'
  },
  {
    id: 'parting-red-sea',
    title: 'The Parting of the Red Sea',
    description: 'Moses leads the Israelites through the Red Sea, which God parts miraculously.',
    scripture: 'Exodus 14',
    difficulty: 'medium',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'The Parting of the Red Sea',
      'The Plagues of Egypt',
      'The Ten Commandments',
      'The Burning Bush'
    ],
    devotional: 'God makes a way where there seems to be no way.'
  },

  // Hard Difficulty Stories
  {
    id: 'sacrifice-isaac',
    title: 'The Sacrifice of Isaac',
    description: 'God tests Abraham\'s faith by asking him to sacrifice his son Isaac.',
    scripture: 'Genesis 22',
    difficulty: 'hard',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'The Sacrifice of Isaac',
      'The Call of Abraham',
      'Jacob\'s Ladder',
      'Joseph Sold into Slavery'
    ],
    devotional: 'True faith is willing to trust God, even when His commands are difficult to understand.'
  },
  {
    id: 'joseph-dreams',
    title: 'Joseph\'s Dreams',
    description: 'Joseph dreams of his future greatness, which leads to jealousy among his brothers.',
    scripture: 'Genesis 37',
    difficulty: 'hard',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Joseph\'s Dreams',
      'The Sacrifice of Isaac',
      'Joseph Sold into Slavery',
      'Joseph Interprets Pharaoh\'s Dreams'
    ],
    devotional: 'God\'s plans for us are greater than we can imagine, even when circumstances seem dire.'
  },
  {
    id: 'joseph-pharaoh',
    title: 'Joseph Interprets Pharaoh\'s Dreams',
    description: 'Joseph rises to power in Egypt by interpreting Pharaoh\'s dreams.',
    scripture: 'Genesis 41',
    difficulty: 'hard',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'Joseph Interprets Pharaoh\'s Dreams',
      'Joseph\'s Dreams',
      'Joseph Sold into Slavery',
      'The Sacrifice of Isaac'
    ],
    devotional: 'God can use our gifts and talents to bring about His purposes, even in unexpected ways.'
  },
  {
    id: 'job-suffering',
    title: 'The Suffering of Job',
    description: 'Job remains faithful to God despite losing everything he has.',
    scripture: 'Job 1-42',
    difficulty: 'hard',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'The Suffering of Job',
      'The Sacrifice of Isaac',
      'Joseph\'s Dreams',
      'The Vision of Ezekiel'
    ],
    devotional: 'Even in suffering, God is with us and will restore us in His time.'
  },
  {
    id: 'vision-ezekiel',
    title: 'The Vision of Ezekiel',
    description: 'Ezekiel sees a vision of God\'s glory and is called to be a prophet.',
    scripture: 'Ezekiel 1',
    difficulty: 'hard',
    imageUrl: 'https://images.unsplash.com/photo-1578469550956-0e16b69c6a3d?q=80&w=1920&auto=format&fit=crop',
    options: [
      'The Vision of Ezekiel',
      'The Suffering of Job',
      'The Call of Isaiah',
      'The Writing on the Wall'
    ],
    devotional: 'God reveals His glory to those who seek Him and are willing to serve Him.'
  }
];