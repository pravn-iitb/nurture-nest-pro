// Official AAP, WHO, and CDC milestone data for 0-5 years

export interface Milestone {
  id: string;
  title: string;
  description: string;
  ageRangeMonths: [number, number]; // [min, max] in months
  category: 'motor' | 'language' | 'cognitive' | 'social' | 'emotional';
  source: 'AAP' | 'WHO' | 'CDC';
  importance: 'high' | 'medium' | 'low';
  tips: string[];
  redFlags: string[];
}

export const officialMilestones: Milestone[] = [
  // 0-6 months
  {
    id: 'smile_social',
    title: 'Social Smile',
    description: 'Smiles back when you smile at them',
    ageRangeMonths: [2, 4],
    category: 'social',
    source: 'AAP',
    importance: 'high',
    tips: [
      'Talk and smile at your baby frequently',
      'Make eye contact during feeding and playing',
      'Respond to their coos and gurgles'
    ],
    redFlags: [
      'No social smile by 3 months',
      'Doesn\'t make eye contact',
      'Doesn\'t respond to sounds'
    ]
  },
  {
    id: 'head_control',
    title: 'Head Control',
    description: 'Holds head steady when supported in sitting position',
    ageRangeMonths: [3, 5],
    category: 'motor',
    source: 'CDC',
    importance: 'high',
    tips: [
      'Give supervised tummy time daily',
      'Support baby in sitting position',
      'Use high-contrast toys to encourage head lifting'
    ],
    redFlags: [
      'Cannot hold head up by 4 months',
      'Head always falls back when pulled to sit',
      'Very floppy muscle tone'
    ]
  },
  
  // 6-12 months
  {
    id: 'sitting_independently',
    title: 'Sits Without Support',
    description: 'Sits without support for several minutes',
    ageRangeMonths: [6, 9],
    category: 'motor',
    source: 'WHO',
    importance: 'high',
    tips: [
      'Practice supported sitting with pillows',
      'Encourage reaching for toys while sitting',
      'Use sit-me-up seats sparingly'
    ],
    redFlags: [
      'Cannot sit without support by 9 months',
      'Falls over immediately when placed sitting',
      'Very weak trunk muscles'
    ]
  },
  {
    id: 'first_words',
    title: 'First Words',
    description: 'Says first words like "mama" or "dada" with meaning',
    ageRangeMonths: [8, 12],
    category: 'language',
    source: 'AAP',
    importance: 'high',
    tips: [
      'Talk to your baby throughout the day',
      'Read books together daily',
      'Respond to their babbling as conversation'
    ],
    redFlags: [
      'No babbling by 12 months',
      'No meaningful words by 15 months',
      'Loss of previously acquired words'
    ]
  },
  
  // 12-18 months
  {
    id: 'walking_independently',
    title: 'Walks Independently',
    description: 'Takes several steps without holding onto anything',
    ageRangeMonths: [10, 18],
    category: 'motor',
    source: 'WHO',
    importance: 'high',
    tips: [
      'Encourage cruising along furniture',
      'Provide push toys for support',
      'Baby-proof your home as they become mobile'
    ],
    redFlags: [
      'Not walking by 18 months',
      'Cannot stand with support by 12 months',
      'Significant limping or asymmetry'
    ]
  },
  {
    id: 'follows_directions',
    title: 'Follows Simple Directions',
    description: 'Follows one-step directions like "give me the ball"',
    ageRangeMonths: [12, 18],
    category: 'cognitive',
    source: 'CDC',
    importance: 'medium',
    tips: [
      'Use simple, clear commands',
      'Pair words with gestures',
      'Praise when they follow directions'
    ],
    redFlags: [
      'Doesn\'t respond to their name by 12 months',
      'Cannot follow any simple directions by 18 months',
      'No understanding of "no" by 15 months'
    ]
  },
  
  // 18-24 months
  {
    id: 'two_word_phrases',
    title: 'Two-Word Phrases',
    description: 'Combines two words to make simple phrases',
    ageRangeMonths: [18, 24],
    category: 'language',
    source: 'AAP',
    importance: 'high',
    tips: [
      'Expand on their single words',
      'Use parallel talk during activities',
      'Read interactive books together'
    ],
    redFlags: [
      'No two-word phrases by 24 months',
      'Very limited vocabulary (less than 25 words)',
      'Doesn\'t try to communicate needs'
    ]
  },
  {
    id: 'pretend_play',
    title: 'Pretend Play',
    description: 'Engages in simple pretend play like feeding a doll',
    ageRangeMonths: [18, 24],
    category: 'cognitive',
    source: 'CDC',
    importance: 'medium',
    tips: [
      'Model pretend play activities',
      'Provide dolls, toy phones, and kitchen sets',
      'Join in their imaginative games'
    ],
    redFlags: [
      'No pretend play by 24 months',
      'Only lines up or sorts toys',
      'Doesn\'t imitate adult actions'
    ]
  },
  
  // 24-36 months
  {
    id: 'runs_climbs',
    title: 'Runs and Climbs',
    description: 'Runs well and climbs onto furniture',
    ageRangeMonths: [24, 30],
    category: 'motor',
    source: 'WHO',
    importance: 'medium',
    tips: [
      'Provide safe spaces for active play',
      'Visit playgrounds regularly',
      'Encourage dancing and movement games'
    ],
    redFlags: [
      'Cannot run by 30 months',
      'Falls frequently while walking',
      'Cannot climb stairs with assistance'
    ]
  },
  {
    id: 'potty_readiness',
    title: 'Potty Training Readiness',
    description: 'Shows interest in potty or stays dry for longer periods',
    ageRangeMonths: [20, 36],
    category: 'emotional',
    source: 'AAP',
    importance: 'medium',
    tips: [
      'Watch for signs of readiness',
      'Introduce potty vocabulary',
      'Let them observe bathroom routines'
    ],
    redFlags: [
      'No interest in potty by 3 years',
      'Cannot communicate bathroom needs',
      'Regression after successful training'
    ]
  },
  
  // 36-48 months
  {
    id: 'pedals_tricycle',
    title: 'Pedals Tricycle',
    description: 'Can pedal a tricycle or ride-on toy',
    ageRangeMonths: [30, 42],
    category: 'motor',
    source: 'CDC',
    importance: 'medium',
    tips: [
      'Start with push bikes or balance bikes',
      'Practice on flat, safe surfaces',
      'Make it fun, not competitive'
    ],
    redFlags: [
      'Cannot coordinate pedaling by 4 years',
      'Poor balance on ride-on toys',
      'Avoids physical activities'
    ]
  },
  {
    id: 'counts_to_five',
    title: 'Counts to Five',
    description: 'Can count to five and understands quantity',
    ageRangeMonths: [36, 48],
    category: 'cognitive',
    source: 'AAP',
    importance: 'medium',
    tips: [
      'Count objects during daily activities',
      'Use number songs and rhymes',
      'Practice with toys and snacks'
    ],
    redFlags: [
      'No number recognition by 4 years',
      'Cannot understand "more" or "less"',
      'Difficulty with basic concepts'
    ]
  },
  
  // 48-60 months
  {
    id: 'draws_person',
    title: 'Draws a Person',
    description: 'Draws a person with at least 3 body parts',
    ageRangeMonths: [42, 54],
    category: 'motor',
    source: 'CDC',
    importance: 'medium',
    tips: [
      'Provide crayons and paper regularly',
      'Draw together and describe what you see',
      'Display their artwork proudly'
    ],
    redFlags: [
      'Cannot hold crayon properly by 4 years',
      'No recognizable drawings by 5 years',
      'Avoids drawing or writing activities'
    ]
  },
  {
    id: 'tells_stories',
    title: 'Tells Simple Stories',
    description: 'Can tell a simple story or describe events',
    ageRangeMonths: [48, 60],
    category: 'language',
    source: 'AAP',
    importance: 'high',
    tips: [
      'Ask open-ended questions about their day',
      'Encourage storytelling during play',
      'Read books and discuss the plot'
    ],
    redFlags: [
      'Very limited vocabulary by 5 years',
      'Cannot form complete sentences',
      'Difficulty being understood by strangers'
    ]
  }
];

export const getMilestonesForAge = (ageInMonths: number): Milestone[] => {
  return officialMilestones.filter(milestone => 
    ageInMonths >= milestone.ageRangeMonths[0] && 
    ageInMonths <= milestone.ageRangeMonths[1] + 6 // Include some buffer
  );
};

export const getOverdueMilestones = (ageInMonths: number): Milestone[] => {
  return officialMilestones.filter(milestone => 
    ageInMonths > milestone.ageRangeMonths[1] + 3 // 3 months past expected range
  );
};