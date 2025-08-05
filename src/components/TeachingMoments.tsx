import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Heart, Share2, Users, Brain, Lightbulb, Target, Clock } from "lucide-react";

interface TeachingMoment {
  id: string;
  title: string;
  description: string;
  category: 'empathy' | 'sharing' | 'tidiness' | 'motor' | 'speech' | 'analytical' | 'social';
  ageAppropriate: boolean;
  difficulty: 'easy' | 'medium' | 'hard';
  duration: string;
  techniques: string[];
  expectedOutcome: string;
  milestoneAlignment?: string;
}

interface TeachingMomentsProps {
  ageInMonths: number;
  onStartTeaching: (id: string) => void;
}

const getTeachingMoments = (ageInMonths: number): TeachingMoment[] => {
  const moments: TeachingMoment[] = [];

  if (ageInMonths <= 12) {
    moments.push(
      {
        id: 'gentle_touch',
        title: 'Gentle Touch',
        description: 'Teach soft, caring touch through modeling and gentle guidance',
        category: 'empathy',
        ageAppropriate: true,
        difficulty: 'easy',
        duration: '5-10 min',
        techniques: ['Model gentle touching', 'Say "gentle" repeatedly', 'Guide their hand'],
        expectedOutcome: 'Baby learns to touch softly',
        milestoneAlignment: 'Social interaction development'
      },
      {
        id: 'cause_effect',
        title: 'Cause & Effect Play',
        description: 'Simple toys that respond to baby\'s actions to develop analytical thinking',
        category: 'analytical',
        ageAppropriate: true,
        difficulty: 'easy',
        duration: '10-15 min',
        techniques: ['Use toys with sounds/lights', 'Repeat actions', 'Celebrate responses'],
        expectedOutcome: 'Understanding that actions have consequences',
        milestoneAlignment: 'Cognitive development'
      }
    );
  } else if (ageInMonths <= 24) {
    moments.push(
      {
        id: 'basic_sharing',
        title: 'Turn-Taking Games',
        description: 'Simple games that introduce the concept of sharing and waiting',
        category: 'sharing',
        ageAppropriate: true,
        difficulty: 'medium',
        duration: '10-15 min',
        techniques: ['Roll ball back and forth', 'Take turns with simple toys', 'Use "your turn, my turn"'],
        expectedOutcome: 'Beginning understanding of sharing',
        milestoneAlignment: 'Social skills development'
      },
      {
        id: 'cleanup_routine',
        title: 'Cleanup Songs',
        description: 'Make tidying up fun with songs and games',
        category: 'tidiness',
        ageAppropriate: true,
        difficulty: 'easy',
        duration: '5-10 min',
        techniques: ['Sing cleanup songs', 'Make it a race', 'Celebrate completion'],
        expectedOutcome: 'Positive association with cleaning up',
        milestoneAlignment: 'Following simple instructions'
      },
      {
        id: 'simple_words',
        title: 'Word Repetition',
        description: 'Encourage speech through repetitive, fun word games',
        category: 'speech',
        ageAppropriate: true,
        difficulty: 'easy',
        duration: '10-20 min',
        techniques: ['Repeat words clearly', 'Use exaggerated expressions', 'Wait for responses'],
        expectedOutcome: 'Increased vocabulary and speech attempts',
        milestoneAlignment: 'Language development'
      }
    );
  } else {
    moments.push(
      {
        id: 'emotion_naming',
        title: 'Feeling Faces',
        description: 'Help children identify and express emotions appropriately',
        category: 'empathy',
        ageAppropriate: true,
        difficulty: 'medium',
        duration: '15-20 min',
        techniques: ['Make faces in mirror', 'Name emotions', 'Validate feelings'],
        expectedOutcome: 'Better emotional awareness and regulation',
        milestoneAlignment: 'Emotional development'
      },
      {
        id: 'problem_solving',
        title: 'Simple Puzzles',
        description: 'Age-appropriate puzzles to develop analytical and motor skills',
        category: 'analytical',
        ageAppropriate: true,
        difficulty: 'medium',
        duration: '15-25 min',
        techniques: ['Start with 2-3 pieces', 'Guide without doing', 'Celebrate attempts'],
        expectedOutcome: 'Improved problem-solving and persistence',
        milestoneAlignment: 'Cognitive and motor development'
      },
      {
        id: 'help_others',
        title: 'Helper Activities',
        description: 'Simple ways for children to help others and develop empathy',
        category: 'empathy',
        ageAppropriate: true,
        difficulty: 'easy',
        duration: '10-15 min',
        techniques: ['Help feed pets', 'Bring items to others', 'Comfort stuffed animals'],
        expectedOutcome: 'Development of caring and helpful behavior',
        milestoneAlignment: 'Social and emotional development'
      }
    );
  }

  return moments.filter(m => m.ageAppropriate);
};

export function TeachingMoments({ ageInMonths, onStartTeaching }: TeachingMomentsProps) {
  const teachingMoments = getTeachingMoments(ageInMonths);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'empathy': return Heart;
      case 'sharing': return Share2;
      case 'tidiness': return Target;
      case 'motor': return Users;
      case 'speech': return Brain;
      case 'analytical': return Lightbulb;
      case 'social': return Users;
      default: return Heart;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'empathy': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'sharing': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'tidiness': return 'bg-green-100 text-green-800 border-green-200';
      case 'motor': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'speech': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'analytical': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'social': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (teachingMoments.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Heart className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
        <h3 className="font-semibold mb-1">Growing Every Day</h3>
        <p className="text-sm text-muted-foreground">
          More teaching opportunities will become available as your child develops.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg mb-1 flex items-center justify-center gap-2">
          <Heart className="h-5 w-5 text-primary" />
          Teaching Moments
        </h3>
        <p className="text-sm text-muted-foreground">
          Age-appropriate ways to nurture important life skills
        </p>
      </div>

      <div className="space-y-3">
        {teachingMoments.map((moment) => {
          const CategoryIcon = getCategoryIcon(moment.category);
          
          return (
            <Card key={moment.id} className="overflow-hidden hover-scale transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <CategoryIcon className="h-4 w-4 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{moment.title}</h4>
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(moment.category)}`}>
                        {moment.category}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                      {moment.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {moment.duration}
                      </div>
                      <div className="text-xs">
                        {moment.difficulty === 'easy' ? '⭐' : moment.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐'}
                      </div>
                    </div>
                    
                    <div className="text-xs text-muted-foreground mb-3">
                      <span className="font-medium">Goal:</span> {moment.expectedOutcome}
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => onStartTeaching(moment.id)}
                        className="flex-1 h-8"
                      >
                        <Heart className="h-3 w-3 mr-1" />
                        Start Teaching
                      </Button>
                    </div>
                  </div>
                </div>
                
                {moment.techniques && moment.techniques.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">Techniques:</div>
                    <div className="flex flex-wrap gap-1">
                      {moment.techniques.slice(0, 2).map((technique, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-muted px-2 py-1 rounded-md"
                        >
                          {technique}
                        </span>
                      ))}
                      {moment.techniques.length > 2 && (
                        <span className="text-xs text-muted-foreground">
                          +{moment.techniques.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}