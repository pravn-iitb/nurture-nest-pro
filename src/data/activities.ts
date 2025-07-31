// Age-appropriate activities for 0-5 years based on developmental research

export interface Activity {
  id: string;
  title: string;
  description: string;
  instructions: string[];
  ageRangeMonths: [number, number];
  duration: string;
  participants: number;
  category: 'physical' | 'cognitive' | 'social' | 'creative' | 'sensory';
  difficulty: 'easy' | 'medium' | 'hard';
  materials: string[];
  benefits: string[];
  image?: string;
}

export const developmentalActivities: Activity[] = [
  // 0-6 months
  {
    id: 'tummy_time_fun',
    title: 'Tummy Time Adventures',
    description: 'Strengthen neck and shoulder muscles with engaging tummy time',
    instructions: [
      'Place baby on soft blanket on floor',
      'Get down at their eye level',
      'Use colorful toys or mirror to encourage head lifting',
      'Start with 2-3 minutes, gradually increase'
    ],
    ageRangeMonths: [0, 6],
    duration: '5-15 min',
    participants: 2,
    category: 'physical',
    difficulty: 'easy',
    materials: ['Soft blanket', 'Colorful toys', 'Baby-safe mirror'],
    benefits: ['Neck strength', 'Motor development', 'Visual tracking'],
    image: '/api/placeholder/300/200'
  },
  {
    id: 'sensory_exploration',
    title: 'Sensory Texture Play',
    description: 'Explore different textures to stimulate sensory development',
    instructions: [
      'Gather safe items with different textures',
      'Let baby touch and explore under supervision',
      'Describe the textures: "soft", "bumpy", "smooth"',
      'Watch for mouthing - ensure items are safe'
    ],
    ageRangeMonths: [3, 8],
    duration: '10-20 min',
    participants: 2,
    category: 'sensory',
    difficulty: 'easy',
    materials: ['Soft fabric', 'Textured toys', 'Safe household items'],
    benefits: ['Sensory awareness', 'Fine motor skills', 'Cognitive development']
  },

  // 6-12 months
  {
    id: 'peek_a_boo',
    title: 'Peek-a-Boo Games',
    description: 'Classic game that teaches object permanence',
    instructions: [
      'Cover your face with hands or cloth',
      'Say "Where did I go?"',
      'Uncover and say "Peek-a-boo!"',
      'Try hiding toys under blankets too'
    ],
    ageRangeMonths: [6, 18],
    duration: '5-10 min',
    participants: 2,
    category: 'cognitive',
    difficulty: 'easy',
    materials: ['Your hands', 'Small blanket', 'Favorite toy'],
    benefits: ['Object permanence', 'Social skills', 'Cause and effect']
  },
  {
    id: 'container_play',
    title: 'Container Fun',
    description: 'Put objects in and take them out to develop fine motor skills',
    instructions: [
      'Provide large container and safe objects',
      'Show how to put objects in',
      'Encourage taking objects out',
      'Make it a game with cheering'
    ],
    ageRangeMonths: [8, 15],
    duration: '15-25 min',
    participants: 1,
    category: 'cognitive',
    difficulty: 'easy',
    materials: ['Large container', 'Blocks', 'Balls', 'Safe toys'],
    benefits: ['Fine motor skills', 'Hand-eye coordination', 'Problem solving']
  },

  // 12-24 months
  {
    id: 'color_sorting',
    title: 'Color Sorting Game',
    description: 'Sort objects by color to develop cognitive skills',
    instructions: [
      'Start with two distinct colors',
      'Show how to sort: "Red goes here, blue goes there"',
      'Let them try with your help',
      'Celebrate each correct sort'
    ],
    ageRangeMonths: [18, 36],
    duration: '15-20 min',
    participants: 2,
    category: 'cognitive',
    difficulty: 'medium',
    materials: ['Colored blocks', 'Two containers', 'Colored balls'],
    benefits: ['Color recognition', 'Classification skills', 'Focus and attention']
  },
  {
    id: 'dance_party',
    title: 'Toddler Dance Party',
    description: 'Move to music to improve coordination and gross motor skills',
    instructions: [
      'Put on child-friendly music',
      'Show different dance moves',
      'Use scarves or ribbons for extra fun',
      'Follow their lead and copy their moves'
    ],
    ageRangeMonths: [12, 36],
    duration: '10-15 min',
    participants: 2,
    category: 'physical',
    difficulty: 'easy',
    materials: ['Music player', 'Scarves or ribbons', 'Open space'],
    benefits: ['Gross motor skills', 'Rhythm and coordination', 'Self-expression']
  },

  // 24-36 months
  {
    id: 'story_building',
    title: 'Collaborative Storytelling',
    description: 'Take turns adding to a story to develop language skills',
    instructions: [
      'Start with "Once upon a time..."',
      'Add one sentence, then let them add one',
      'Use picture books as inspiration',
      'Keep it simple and fun'
    ],
    ageRangeMonths: [24, 48],
    duration: '15-20 min',
    participants: 2,
    category: 'social',
    difficulty: 'medium',
    materials: ['Picture books', 'Imagination', 'Comfortable seating'],
    benefits: ['Language development', 'Creativity', 'Turn-taking skills']
  },
  {
    id: 'obstacle_course',
    title: 'Indoor Obstacle Course',
    description: 'Create a safe course to practice gross motor skills',
    instructions: [
      'Use pillows, blankets, and furniture',
      'Create crawling, stepping, and climbing challenges',
      'Demonstrate each part first',
      'Make it about fun, not speed'
    ],
    ageRangeMonths: [18, 42],
    duration: '20-30 min',
    participants: 2,
    category: 'physical',
    difficulty: 'medium',
    materials: ['Pillows', 'Blankets', 'Tape for marking', 'Safe furniture'],
    benefits: ['Gross motor skills', 'Problem solving', 'Following directions']
  },

  // 36-48 months
  {
    id: 'nature_scavenger_hunt',
    title: 'Nature Scavenger Hunt',
    description: 'Find items in nature to develop observation skills',
    instructions: [
      'Create simple picture list of items to find',
      'Look for leaves, rocks, flowers, sticks',
      'Talk about what you find',
      'Count and compare discoveries'
    ],
    ageRangeMonths: [30, 60],
    duration: '30-45 min',
    participants: 2,
    category: 'cognitive',
    difficulty: 'medium',
    materials: ['Picture list', 'Collection bag', 'Magnifying glass'],
    benefits: ['Observation skills', 'Nature awareness', 'Following directions']
  },
  {
    id: 'role_play_restaurant',
    title: 'Restaurant Role Play',
    description: 'Pretend play to develop social and language skills',
    instructions: [
      'Set up a pretend restaurant with toys',
      'Take turns being customer and server',
      'Use menus, play money, and food toys',
      'Practice polite conversation'
    ],
    ageRangeMonths: [30, 60],
    duration: '25-40 min',
    participants: 2,
    category: 'social',
    difficulty: 'medium',
    materials: ['Play food', 'Toy dishes', 'Play money', 'Order pad'],
    benefits: ['Social skills', 'Language development', 'Imagination']
  },

  // 48-60 months
  {
    id: 'science_experiments',
    title: 'Simple Science Fun',
    description: 'Easy experiments to develop scientific thinking',
    instructions: [
      'Try sink or float with different objects',
      'Mix colors with safe materials',
      'Ask "What do you think will happen?"',
      'Discuss the results together'
    ],
    ageRangeMonths: [42, 60],
    duration: '30-45 min',
    participants: 2,
    category: 'cognitive',
    difficulty: 'hard',
    materials: ['Water', 'Various objects', 'Food coloring', 'Containers'],
    benefits: ['Scientific thinking', 'Prediction skills', 'Observation']
  },
  {
    id: 'letter_treasure_hunt',
    title: 'Letter Treasure Hunt',
    description: 'Find letters around the house to support pre-reading skills',
    instructions: [
      'Choose 2-3 letters to focus on',
      'Look for these letters on signs, books, packages',
      'Sound out the letters when found',
      'Create a collection of found letters'
    ],
    ageRangeMonths: [42, 60],
    duration: '20-30 min',
    participants: 2,
    category: 'cognitive',
    difficulty: 'medium',
    materials: ['Letter cards', 'Magnifying glass', 'Collection notebook'],
    benefits: ['Letter recognition', 'Pre-reading skills', 'Attention to detail']
  }
];

export const getActivitiesForAge = (ageInMonths: number): Activity[] => {
  return developmentalActivities.filter(activity => 
    ageInMonths >= activity.ageRangeMonths[0] && 
    ageInMonths <= activity.ageRangeMonths[1]
  );
};

export const getActivitiesByCategory = (category: Activity['category'], ageInMonths: number): Activity[] => {
  return getActivitiesForAge(ageInMonths).filter(activity => 
    activity.category === category
  );
};

// Export alias for backward compatibility
export const activities = developmentalActivities;