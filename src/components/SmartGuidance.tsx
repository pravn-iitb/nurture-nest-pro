import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Lightbulb, Users, ArrowRight, Clock } from "lucide-react";

interface GuidanceItem {
  id: string;
  type: 'tip' | 'activity' | 'milestone' | 'social';
  title: string;
  description: string;
  urgency: 'low' | 'medium' | 'high';
  readTime?: string;
  category: string;
}

interface SmartGuidanceProps {
  ageInDays: number;
  onActionTaken: (id: string, action: string) => void;
}

export function SmartGuidance({ ageInDays, onActionTaken }: SmartGuidanceProps) {
  // Generate age-appropriate guidance
  const getSmartGuidance = (): GuidanceItem[] => {
    if (ageInDays < 30) {
      // Newborn (0-30 days)
      return [
        {
          id: "newborn-1",
          type: "tip",
          title: "Skin-to-skin bonding",
          description: "Hold your baby against your chest for 15-20 minutes daily to promote bonding and regulate temperature.",
          urgency: "high",
          readTime: "2 min",
          category: "Bonding"
        },
        {
          id: "newborn-2", 
          type: "milestone",
          title: "First eye contact expected",
          description: "Most babies start making brief eye contact by 2-3 weeks. Track this important social milestone.",
          urgency: "medium",
          category: "Development"
        },
        {
          id: "newborn-3",
          type: "social",
          title: "Other parents: 'Sleep when baby sleeps'",
          description: "Connect with parents who survived the newborn phase and learn their best sleep strategies.",
          urgency: "low",
          category: "Community"
        }
      ];
    } else if (ageInDays < 90) {
      // Early infant (1-3 months)
      return [
        {
          id: "infant-1",
          type: "activity",
          title: "Tummy time routine",
          description: "Start with 3-5 minutes, 3 times daily. This strengthens neck and shoulder muscles.",
          urgency: "high",
          readTime: "1 min",
          category: "Physical"
        },
        {
          id: "infant-2",
          type: "milestone", 
          title: "Social smiles due soon",
          description: "Around 6-8 weeks, expect your baby's first real smiles in response to your voice or face.",
          urgency: "medium",
          category: "Social"
        },
        {
          id: "infant-3",
          type: "social",
          title: "Parents share: 'Baby's first smile stories'",
          description: "Read heartwarming first smile moments from other parents and share your own.",
          urgency: "low",
          category: "Community"
        }
      ];
    } else if (ageInDays < 365) {
      // Later infant (3-12 months)
      return [
        {
          id: "older-1",
          type: "activity",
          title: "Reading together",
          description: "Even if they can't understand words yet, reading builds language skills and bonding.",
          urgency: "medium",
          readTime: "2 min",
          category: "Cognitive"
        },
        {
          id: "older-2",
          type: "milestone",
          title: "Sitting milestone window",
          description: "Most babies sit without support between 4-9 months. Encourage with supervised practice.",
          urgency: "medium",
          category: "Motor Skills"
        },
        {
          id: "older-3",
          type: "social",
          title: "Sleep training experiences",
          description: "Connect with parents who've navigated sleep training around this age.",
          urgency: "low",
          category: "Community"
        }
      ];
    } else {
      // Toddler (12+ months)
      return [
        {
          id: "toddler-1",
          type: "activity", 
          title: "Independent play time",
          description: "Encourage 10-15 minutes of solo play to build independence and creativity.",
          urgency: "medium",
          readTime: "3 min",
          category: "Development"
        },
        {
          id: "toddler-2",
          type: "tip",
          title: "Managing tantrums",
          description: "Stay calm, acknowledge feelings, and offer comfort once they've calmed down.",
          urgency: "high",
          readTime: "4 min",
          category: "Behavior"
        },
        {
          id: "toddler-3",
          type: "social",
          title: "Toddler tantrum survival stories",
          description: "Learn from other parents' experiences with toddler emotional outbursts.",
          urgency: "low",
          category: "Community"
        }
      ];
    }
  };

  const guidance = getSmartGuidance();

  const getIcon = (type: string) => {
    switch (type) {
      case 'tip': return Lightbulb;
      case 'activity': return Clock;
      case 'milestone': return ArrowRight;
      case 'social': return Users;
      default: return Lightbulb;
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high': return 'bg-red-100 text-red-800 border-red-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-bold">Smart Guidance</h2>
      
      <div className="space-y-3">
        {guidance.map((item) => {
          const Icon = getIcon(item.type);
          return (
            <Card key={item.id} className="overflow-hidden hover-scale">
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${item.type === 'social' ? 'bg-primary/10' : 'bg-accent/10'}`}>
                    <Icon className={`h-4 w-4 ${item.type === 'social' ? 'text-primary' : 'text-accent'}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-medium text-sm">{item.title}</h3>
                      <Badge variant="outline" className={`text-xs ${getUrgencyColor(item.urgency)}`}>
                        {item.category}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3 leading-relaxed">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      {item.readTime && (
                        <span className="text-xs text-muted-foreground">
                          📖 {item.readTime}
                        </span>
                      )}
                      
                      <div className="flex gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onActionTaken(item.id, 'learn')}
                        >
                          Learn More
                        </Button>
                        {item.type === 'activity' && (
                          <Button 
                            variant="default" 
                            size="sm"
                            onClick={() => onActionTaken(item.id, 'start')}
                          >
                            Start
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
}