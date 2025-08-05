import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Target, Clock, Users, Lightbulb, Heart, TrendingUp } from "lucide-react";
import { getMilestonesForAge } from "@/data/enhancedMilestones";

interface PlayIdea {
  id: string;
  title: string;
  description: string;
  targetMilestone: string;
  category: 'physical' | 'cognitive' | 'language' | 'social' | 'emotional' | 'behavioral';
  duration: string;
  materials: string[];
  ageGroup: string;
  difficulty: 'easy' | 'medium' | 'hard';
}

interface SmartActivitiesProps {
  ageInMonths: number;
  completedMilestones: string[];
  onStartActivity: (id: string) => void;
}

const generatePlayIdeas = (ageInMonths: number, completedMilestones: string[]): PlayIdea[] => {
  const milestones = getMilestonesForAge(ageInMonths);
  const upcomingMilestones = milestones.filter(m => !completedMilestones.includes(m.id));
  
  const playIdeas: PlayIdea[] = [];

  upcomingMilestones.forEach(milestone => {
    switch (milestone.category) {
      case 'physical':
        if (ageInMonths <= 6) {
          playIdeas.push({
            id: `play_${milestone.id}_1`,
            title: "Tummy Time Adventures",
            description: "Place colorful toys just out of reach to encourage reaching and neck strength",
            targetMilestone: milestone.title,
            category: 'physical',
            duration: "10-15 min",
            materials: ["Colorful toys", "Soft blanket"],
            ageGroup: "0-6 months",
            difficulty: 'easy'
          });
        } else if (ageInMonths <= 12) {
          playIdeas.push({
            id: `play_${milestone.id}_1`,
            title: "Crawling Obstacle Course",
            description: "Create safe obstacles with pillows and toys to encourage crawling and exploration",
            targetMilestone: milestone.title,
            category: 'physical',
            duration: "15-20 min",
            materials: ["Soft pillows", "Toys", "Safe space"],
            ageGroup: "6-12 months",
            difficulty: 'medium'
          });
        }
        break;
      
      case 'cognitive':
        if (ageInMonths <= 12) {
          playIdeas.push({
            id: `play_${milestone.id}_1`,
            title: "Peek-a-Boo Variations",
            description: "Play different versions of peek-a-boo to develop object permanence",
            targetMilestone: milestone.title,
            category: 'cognitive',
            duration: "5-10 min",
            materials: ["Blanket or hands"],
            ageGroup: "3-12 months",
            difficulty: 'easy'
          });
        } else {
          playIdeas.push({
            id: `play_${milestone.id}_1`,
            title: "Shape Sorting Fun",
            description: "Practice sorting shapes to develop problem-solving and hand-eye coordination",
            targetMilestone: milestone.title,
            category: 'cognitive',
            duration: "10-15 min",
            materials: ["Shape sorter toy", "Various shaped objects"],
            ageGroup: "12+ months",
            difficulty: 'medium'
          });
        }
        break;
      
      case 'language':
        playIdeas.push({
          id: `play_${milestone.id}_1`,
          title: "Story Time & Sounds",
          description: "Read books with different textures and sounds to promote language development",
          targetMilestone: milestone.title,
          category: 'language',
          duration: "15-20 min",
          materials: ["Picture books", "Sound books"],
          ageGroup: `${Math.floor(ageInMonths/12)}-${Math.floor(ageInMonths/12)+1} years`,
          difficulty: 'easy'
        });
        break;
      
      case 'social':
        playIdeas.push({
          id: `play_${milestone.id}_1`,
          title: "Mirror Play & Expressions",
          description: "Use mirrors to help recognize faces and practice social expressions",
          targetMilestone: milestone.title,
          category: 'social',
          duration: "10-15 min",
          materials: ["Safe mirror", "Toys"],
          ageGroup: `${Math.floor(ageInMonths/12)}-${Math.floor(ageInMonths/12)+1} years`,
          difficulty: 'easy'
        });
        break;
    }
  });

  return playIdeas.slice(0, 4); // Return top 4 most relevant
};

export function SmartActivities({ ageInMonths, completedMilestones, onStartActivity }: SmartActivitiesProps) {
  const playIdeas = generatePlayIdeas(ageInMonths, completedMilestones);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'physical': return TrendingUp;
      case 'cognitive': return Lightbulb;
      case 'language': return Heart;
      case 'social': return Users;
      default: return Play;
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physical': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cognitive': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'language': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'social': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (playIdeas.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Play className="h-12 w-12 mx-auto mb-3 text-success" />
        <h3 className="font-semibold mb-1">Great Progress!</h3>
        <p className="text-sm text-muted-foreground">
          All current milestones are on track. New activities will appear as your child grows.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg mb-1 flex items-center justify-center gap-2">
          <Target className="h-5 w-5 text-primary" />
          Milestone-Focused Play
        </h3>
        <p className="text-sm text-muted-foreground">
          Activities designed to support upcoming developmental goals
        </p>
      </div>

      <div className="space-y-3">
        {playIdeas.map((idea) => {
          const CategoryIcon = getCategoryIcon(idea.category);
          
          return (
            <Card key={idea.id} className="overflow-hidden hover-scale transition-all duration-300">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-primary/10">
                    <CategoryIcon className="h-4 w-4 text-primary" />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{idea.title}</h4>
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(idea.category)}`}>
                        {idea.category}
                      </Badge>
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-2 leading-relaxed">
                      {idea.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Target className="h-3 w-3" />
                        <span>Helps with: {idea.targetMilestone}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {idea.duration}
                      </div>
                      <div className="text-xs">
                        {idea.difficulty === 'easy' ? '⭐' : idea.difficulty === 'medium' ? '⭐⭐' : '⭐⭐⭐'}
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => onStartActivity(idea.id)}
                        className="flex-1 h-8"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Start Activity
                      </Button>
                    </div>
                  </div>
                </div>
                
                {idea.materials && idea.materials.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">Materials needed:</div>
                    <div className="flex flex-wrap gap-1">
                      {idea.materials.map((material, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-muted px-2 py-1 rounded-md"
                        >
                          {material}
                        </span>
                      ))}
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