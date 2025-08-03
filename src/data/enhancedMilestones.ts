// Enhanced milestone data with granular tracking and multiple categories

export interface EnhancedMilestone {
  id: string;
  title: string;
  description: string;
  ageRangeMonths: [number, number];
  category: 'physical' | 'cognitive' | 'language' | 'social' | 'emotional' | 'behavioral';
  subcategory: string;
  source: 'AAP' | 'WHO' | 'CDC' | 'Combined';
  importance: 'critical' | 'high' | 'medium' | 'low';
  tips: string[];
  activities: string[];
  redFlags: string[];
  socialSupport?: {
    parentsReportRate: number;
    commonChallenges: string[];
    supportTips: string[];
  };
}

export const enhancedMilestones: EnhancedMilestone[] = [
  // NEWBORN (0-2 months) - Very granular
  {
    id: 'first_smile',
    title: 'First Social Smile',
    description: 'Baby smiles in response to your voice or face',
    ageRangeMonths: [1, 3],
    category: 'social',
    subcategory: 'Social Engagement',
    source: 'AAP',
    importance: 'critical',
    tips: [
      'Talk and smile at your baby frequently',
      'Make eye contact during feeding',
      'Respond to baby\'s coos and sounds'
    ],
    activities: [
      'Face-to-face play during alert time',
      'Gentle talking and singing',
      'Mirror play sessions'
    ],
    redFlags: [
      'No social smile by 10 weeks',
      'Doesn\'t make eye contact',
      'Seems unaware of people around them'
    ],
    socialSupport: {
      parentsReportRate: 85,
      commonChallenges: ['Baby seems serious all the time', 'Wondering if smiles are just gas'],
      supportTips: ['Every baby develops at their own pace', 'Real smiles come with eye contact']
    }
  },
  {
    id: 'turns_head_to_sounds',
    title: 'Turns Head to Sounds',
    description: 'Baby turns head toward familiar voices and sounds',
    ageRangeMonths: [0, 2],
    category: 'physical',
    subcategory: 'Sensory Development',
    source: 'CDC',
    importance: 'high',
    tips: [
      'Talk from different sides of baby',
      'Use rattles and soft music',
      'Call baby\'s name during interaction'
    ],
    activities: [
      'Sound location games',
      'Gentle music from different directions',
      'Talking while moving around baby'
    ],
    redFlags: [
      'No response to loud sounds by 1 month',
      'Doesn\'t startle at sudden noises',
      'Never turns toward your voice'
    ]
  },

  // EARLY INFANCY (2-4 months)
  {
    id: 'holds_head_steady',
    title: 'Holds Head Steady',
    description: 'Can hold head steady when held upright',
    ageRangeMonths: [2, 4],
    category: 'physical',
    subcategory: 'Motor Control',
    source: 'WHO',
    importance: 'critical',
    tips: [
      'Provide daily supervised tummy time',
      'Support baby in sitting position briefly',
      'Encourage head lifting with toys'
    ],
    activities: [
      'Tummy time with colorful toys',
      'Supported sitting practice',
      'High contrast visual stimulation'
    ],
    redFlags: [
      'Cannot hold head up during tummy time by 3 months',
      'Head always flops back when pulled to sit',
      'Very weak neck muscles'
    ],
    socialSupport: {
      parentsReportRate: 78,
      commonChallenges: ['Baby hates tummy time', 'Worried about head shape'],
      supportTips: ['Start with very short tummy time sessions', 'Consult pediatrician about head shape concerns']
    }
  },
  {
    id: 'reaches_for_objects',
    title: 'Reaches for Objects',
    description: 'Deliberately reaches for and tries to grab toys',
    ageRangeMonths: [3, 5],
    category: 'physical',
    subcategory: 'Fine Motor',
    source: 'AAP',
    importance: 'high',
    tips: [
      'Offer toys just within reach',
      'Use bright, interesting objects',
      'Practice during alert, happy times'
    ],
    activities: [
      'Dangling toy play',
      'Reaching for colorful objects',
      'Texture exploration with supervision'
    ],
    redFlags: [
      'No interest in reaching by 4 months',
      'Hands always kept in fists',
      'No attempt to bring hands to mouth'
    ]
  },

  // MID INFANCY (4-8 months)
  {
    id: 'rolls_over',
    title: 'Rolls Over',
    description: 'Rolls from tummy to back and back to tummy',
    ageRangeMonths: [4, 7],
    category: 'physical',
    subcategory: 'Gross Motor',
    source: 'CDC',
    importance: 'high',
    tips: [
      'Encourage rolling during play',
      'Use toys to motivate movement',
      'Ensure safe rolling space'
    ],
    activities: [
      'Rolling games on soft surface',
      'Toy motivation on one side',
      'Tummy time strengthening'
    ],
    redFlags: [
      'No rolling by 6 months',
      'Only rolls one direction',
      'Seems uninterested in movement'
    ],
    socialSupport: {
      parentsReportRate: 82,
      commonChallenges: ['Baby only rolls one way', 'Scared baby will roll off surfaces'],
      supportTips: ['Practice both directions equally', 'Always supervise on elevated surfaces']
    }
  },
  {
    id: 'sits_with_support',
    title: 'Sits with Support',
    description: 'Can sit when supported, holds head steady',
    ageRangeMonths: [4, 6],
    category: 'physical',
    subcategory: 'Gross Motor',
    source: 'WHO',
    importance: 'high',
    tips: [
      'Practice supported sitting daily',
      'Use pillows for support initially',
      'Make sitting time engaging with toys'
    ],
    activities: [
      'Supported sitting with pillows',
      'Toy play while sitting',
      'Short sitting practice sessions'
    ],
    redFlags: [
      'Cannot sit even with support by 6 months',
      'Head flops forward when sitting',
      'No trunk control'
    ]
  },
  {
    id: 'babbles_consonants',
    title: 'Babbles with Consonants',
    description: 'Makes sounds like "ba", "da", "ga"',
    ageRangeMonths: [4, 8],
    category: 'language',
    subcategory: 'Speech Development',
    source: 'AAP',
    importance: 'critical',
    tips: [
      'Respond to baby\'s babbling',
      'Repeat sounds baby makes',
      'Talk throughout daily activities'
    ],
    activities: [
      'Babbling conversations',
      'Sound repetition games',
      'Reading simple books aloud'
    ],
    redFlags: [
      'No babbling by 6 months',
      'Very quiet baby with few sounds',
      'No response when you talk'
    ]
  },

  // LATE INFANCY (6-12 months)
  {
    id: 'sits_independently',
    title: 'Sits Without Support',
    description: 'Sits alone without falling over for several minutes',
    ageRangeMonths: [6, 9],
    category: 'physical',
    subcategory: 'Gross Motor',
    source: 'WHO',
    importance: 'critical',
    tips: [
      'Practice sitting daily',
      'Place toys around baby while sitting',
      'Let baby learn to catch themselves'
    ],
    activities: [
      'Independent sitting practice',
      'Toy reaching while sitting',
      'Sitting balance games'
    ],
    redFlags: [
      'Cannot sit without support by 9 months',
      'Falls over immediately when placed sitting',
      'Very unstable trunk'
    ]
  },
  {
    id: 'stranger_awareness',
    title: 'Shows Stranger Awareness',
    description: 'May be cautious or clingy around unfamiliar people',
    ageRangeMonths: [6, 12],
    category: 'social',
    subcategory: 'Social Awareness',
    source: 'AAP',
    importance: 'medium',
    tips: [
      'This is normal development',
      'Introduce new people gradually',
      'Stay calm and reassuring'
    ],
    activities: [
      'Gradual introduction to new people',
      'Social interaction practice',
      'Comfort and reassurance'
    ],
    redFlags: [
      'No recognition of familiar vs unfamiliar people',
      'Extreme distress with everyone except one person',
      'No preference for primary caregivers'
    ]
  },
  {
    id: 'crawls_or_scoots',
    title: 'Crawls or Scoots',
    description: 'Moves around using crawling, scooting, or bottom shuffling',
    ageRangeMonths: [7, 11],
    category: 'physical',
    subcategory: 'Gross Motor',
    source: 'CDC',
    importance: 'high',
    tips: [
      'Encourage movement with toys',
      'Create safe exploration spaces',
      'Some babies skip crawling - that\'s okay'
    ],
    activities: [
      'Crawling obstacle courses',
      'Toy motivation for movement',
      'Different surface exploration'
    ],
    redFlags: [
      'No attempt to move by 10 months',
      'Uses only one side of body',
      'Significant asymmetry in movement'
    ]
  },

  // EARLY TODDLER (12-18 months)
  {
    id: 'walks_independently',
    title: 'Walks Independently',
    description: 'Takes several steps without holding onto anything',
    ageRangeMonths: [9, 18],
    category: 'physical',
    subcategory: 'Gross Motor',
    source: 'WHO',
    importance: 'critical',
    tips: [
      'Encourage cruising along furniture',
      'Provide push toys for practice',
      'Baby-proof the environment'
    ],
    activities: [
      'Cruising practice',
      'Push toy walking',
      'Independent step encouragement'
    ],
    redFlags: [
      'Not walking by 18 months',
      'Cannot stand without support by 15 months',
      'Significant limping or favoring one side'
    ],
    socialSupport: {
      parentsReportRate: 75,
      commonChallenges: ['Late walker anxiety', 'Comparison with other babies'],
      supportTips: ['Wide range of normal walking ages', 'Focus on other development areas too']
    }
  },
  {
    id: 'first_meaningful_words',
    title: 'First Meaningful Words',
    description: 'Says first words like "mama", "dada", "bye" with meaning',
    ageRangeMonths: [8, 15],
    category: 'language',
    subcategory: 'Speech Development',
    source: 'AAP',
    importance: 'critical',
    tips: [
      'Talk to your child constantly',
      'Respond to their attempts at words',
      'Read books together daily'
    ],
    activities: [
      'Word repetition games',
      'Daily book reading',
      'Naming everyday objects'
    ],
    redFlags: [
      'No meaningful words by 15 months',
      'Loss of previously acquired words',
      'No attempt to communicate'
    ]
  },
  {
    id: 'points_to_request',
    title: 'Points to Request Things',
    description: 'Points at objects they want or find interesting',
    ageRangeMonths: [10, 16],
    category: 'cognitive',
    subcategory: 'Communication',
    source: 'CDC',
    importance: 'high',
    tips: [
      'Follow their pointing and name objects',
      'Encourage pointing during play',
      'Point to things yourself'
    ],
    activities: [
      'Pointing games',
      'Object naming when they point',
      'Interactive book pointing'
    ],
    redFlags: [
      'No pointing by 15 months',
      'Doesn\'t follow when you point',
      'No gesture communication'
    ]
  },

  // BEHAVIOR & SOCIAL (15-24 months)
  {
    id: 'follows_simple_instructions',
    title: 'Follows Simple Instructions',
    description: 'Can follow one-step directions like "give me the ball"',
    ageRangeMonths: [12, 20],
    category: 'cognitive',
    subcategory: 'Understanding',
    source: 'AAP',
    importance: 'high',
    tips: [
      'Use simple, clear language',
      'Pair words with gestures',
      'Practice during daily routines'
    ],
    activities: [
      'Simple instruction games',
      'Daily routine following',
      'Gesture-supported commands'
    ],
    redFlags: [
      'No response to simple instructions by 18 months',
      'Doesn\'t respond to their name consistently',
      'No understanding of "no" by 15 months'
    ]
  },
  {
    id: 'stacks_blocks',
    title: 'Stacks 2-3 Blocks',
    description: 'Can stack blocks or similar objects on top of each other',
    ageRangeMonths: [15, 22],
    category: 'physical',
    subcategory: 'Fine Motor',
    source: 'CDC',
    importance: 'medium',
    tips: [
      'Provide large, easy-to-handle blocks',
      'Demonstrate stacking',
      'Celebrate their attempts'
    ],
    activities: [
      'Block stacking practice',
      'Building simple towers',
      'Knocking down games'
    ],
    redFlags: [
      'No interest in manipulating objects by 18 months',
      'Cannot pick up small objects',
      'Very poor hand coordination'
    ]
  },
  {
    id: 'empathy_behaviors',
    title: 'Shows Empathy',
    description: 'Comforts others when they cry or seem upset',
    ageRangeMonths: [16, 24],
    category: 'emotional',
    subcategory: 'Empathy Development',
    source: 'Combined',
    importance: 'medium',
    tips: [
      'Model empathetic responses',
      'Talk about feelings',
      'Acknowledge their caring behaviors'
    ],
    activities: [
      'Comfort doll play',
      'Emotion naming games',
      'Kindness modeling'
    ],
    redFlags: [
      'No response to others\' distress by 2 years',
      'Seems unaware of others\' emotions',
      'Shows aggression without remorse'
    ]
  },

  // ADVANCED TODDLER (18-36 months)
  {
    id: 'two_word_phrases',
    title: 'Uses Two-Word Phrases',
    description: 'Combines words like "more milk" or "daddy go"',
    ageRangeMonths: [16, 26],
    category: 'language',
    subcategory: 'Speech Development',
    source: 'AAP',
    importance: 'critical',
    tips: [
      'Expand on their single words',
      'Use simple sentences',
      'Read together daily'
    ],
    activities: [
      'Phrase building games',
      'Daily conversation',
      'Interactive storytelling'
    ],
    redFlags: [
      'No two-word phrases by 24 months',
      'Very limited vocabulary (under 25 words)',
      'Difficulty being understood'
    ]
  },
  {
    id: 'parallel_play',
    title: 'Engages in Parallel Play',
    description: 'Plays alongside other children, not necessarily together',
    ageRangeMonths: [18, 30],
    category: 'social',
    subcategory: 'Social Development',
    source: 'CDC',
    importance: 'medium',
    tips: [
      'Arrange playdates with peers',
      'Don\'t force interaction',
      'Model sharing and turn-taking'
    ],
    activities: [
      'Peer play opportunities',
      'Side-by-side activities',
      'Group activity participation'
    ],
    redFlags: [
      'No interest in other children by 2.5 years',
      'Always aggressive with peers',
      'Cannot tolerate other children nearby'
    ]
  },
  {
    id: 'potty_interest',
    title: 'Shows Potty Interest',
    description: 'Shows awareness of wet/dirty diapers or interest in potty',
    ageRangeMonths: [18, 36],
    category: 'behavioral',
    subcategory: 'Self-Care',
    source: 'AAP',
    importance: 'medium',
    tips: [
      'Watch for readiness signs',
      'Introduce potty vocabulary',
      'Let them observe bathroom routines'
    ],
    activities: [
      'Potty book reading',
      'Bathroom routine observation',
      'Potty chair introduction'
    ],
    redFlags: [
      'No awareness of bodily functions by 3 years',
      'Strong resistance to any potty discussions',
      'Regression in toilet habits'
    ]
  },

  // PRESCHOOL PREP (24-48 months)
  {
    id: 'runs_confidently',
    title: 'Runs Confidently',
    description: 'Runs smoothly without frequent falling',
    ageRangeMonths: [20, 30],
    category: 'physical',
    subcategory: 'Gross Motor',
    source: 'WHO',
    importance: 'medium',
    tips: [
      'Provide safe running spaces',
      'Practice on different surfaces',
      'Encourage outdoor active play'
    ],
    activities: [
      'Running games',
      'Chase activities',
      'Playground exploration'
    ],
    redFlags: [
      'Cannot run without falling frequently by 30 months',
      'Appears clumsy or uncoordinated',
      'Avoids physical activities'
    ]
  },
  {
    id: 'imaginative_play',
    title: 'Imaginative Play',
    description: 'Engages in pretend play like feeding dolls or playing house',
    ageRangeMonths: [20, 36],
    category: 'cognitive',
    subcategory: 'Imagination',
    source: 'AAP',
    importance: 'high',
    tips: [
      'Provide props for pretend play',
      'Join in their imaginative games',
      'Encourage storytelling'
    ],
    activities: [
      'Doll care play',
      'Kitchen pretend play',
      'Dress-up activities'
    ],
    redFlags: [
      'No pretend play by 30 months',
      'Only repetitive, non-creative play',
      'Cannot engage in simple role play'
    ]
  }
];

export const getMilestonesForAge = (ageInMonths: number): EnhancedMilestone[] => {
  // Get milestones for current age plus upcoming ones (next 3 months)
  return enhancedMilestones.filter(milestone => 
    (ageInMonths >= milestone.ageRangeMonths[0] && ageInMonths <= milestone.ageRangeMonths[1]) ||
    (ageInMonths >= milestone.ageRangeMonths[0] - 3 && ageInMonths < milestone.ageRangeMonths[0])
  ).sort((a, b) => {
    // Sort by importance, then by age
    const importanceOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    if (importanceOrder[a.importance] !== importanceOrder[b.importance]) {
      return importanceOrder[a.importance] - importanceOrder[b.importance];
    }
    return a.ageRangeMonths[0] - b.ageRangeMonths[0];
  });
};

export const getMilestonesByCategory = (ageInMonths: number, category: EnhancedMilestone['category']): EnhancedMilestone[] => {
  return getMilestonesForAge(ageInMonths).filter(m => m.category === category);
};

export const getOverdueMilestones = (ageInMonths: number): EnhancedMilestone[] => {
  return enhancedMilestones.filter(milestone => 
    ageInMonths > milestone.ageRangeMonths[1] + 2 // 2 months past expected range
  );
};

export const getUpcomingMilestones = (ageInMonths: number): EnhancedMilestone[] => {
  return enhancedMilestones.filter(milestone => 
    ageInMonths < milestone.ageRangeMonths[0] && 
    ageInMonths >= milestone.ageRangeMonths[0] - 3 // Next 3 months
  ).sort((a, b) => a.ageRangeMonths[0] - b.ageRangeMonths[0]);
};