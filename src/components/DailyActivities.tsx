import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Star, Play, ChevronRight } from "lucide-react";
import { developmentalActivities, getActivitiesForAge } from "@/data/activities";

interface DailyActivitiesProps {
  ageInMonths: number;
  onStartActivity: (id: string) => void;
  onViewDetails: (id: string) => void;
}

export function DailyActivities({ ageInMonths, onStartActivity, onViewDetails }: DailyActivitiesProps) {
  const activities = getActivitiesForAge(ageInMonths);
  
  // Pick today's featured activities (rotating based on day)
  const today = new Date().getDate();
  const todaysActivities = activities
    .sort((a, b) => a.id.localeCompare(b.id)) // Consistent sorting
    .slice((today - 1) % activities.length, ((today - 1) % activities.length) + 3)
    .concat(activities.slice(0, Math.max(0, 3 - activities.length + ((today - 1) % activities.length))))
    .slice(0, 3);

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'physical': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'cognitive': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'social': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'creative': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'sensory': return 'bg-orange-100 text-orange-800 border-orange-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getDifficultyIcon = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return '⭐';
      case 'medium': return '⭐⭐';
      case 'hard': return '⭐⭐⭐';
      default: return '⭐';
    }
  };

  if (activities.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Play className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
        <h3 className="font-semibold mb-1">Stay Tuned!</h3>
        <p className="text-sm text-muted-foreground">
          More activities will be available as your child grows.
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-center mb-4">
        <h3 className="font-semibold text-lg mb-1">Today's Play Ideas</h3>
        <p className="text-sm text-muted-foreground">
          {todaysActivities.length} activities perfect for this age
        </p>
      </div>

      <div className="space-y-3">
        {todaysActivities.map((activity, index) => {
          const fullActivity = developmentalActivities.find(a => a.id === activity.id);
          
          return (
            <Card 
              key={activity.id} 
              className="overflow-hidden hover-scale transition-all duration-300 border-border/50"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-xl ${index === 0 ? 'bg-primary/10' : 'bg-accent/10'}`}>
                    <Play className={`h-4 w-4 ${index === 0 ? 'text-primary' : 'text-accent'}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">{activity.title}</h4>
                      {index === 0 && (
                        <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                          Featured
                        </Badge>
                      )}
                    </div>
                    
                    <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                      {activity.description}
                    </p>
                    
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className={`text-xs ${getCategoryColor(activity.category)}`}>
                        {activity.category}
                      </Badge>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        {activity.duration}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Users className="h-3 w-3" />
                        {activity.participants === 1 ? 'Solo' : `${activity.participants} people`}
                      </div>
                      <span className="text-xs">
                        {getDifficultyIcon(activity.difficulty)}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Button 
                        variant="default" 
                        size="sm"
                        onClick={() => onStartActivity(activity.id)}
                        className="flex-1 h-8"
                      >
                        <Play className="h-3 w-3 mr-1" />
                        Start Playing
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => onViewDetails(activity.id)}
                        className="h-8 px-2"
                      >
                        <ChevronRight className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </div>
                
                {fullActivity?.materials && fullActivity.materials.length > 0 && (
                  <div className="mt-3 pt-3 border-t border-border/50">
                    <div className="text-xs text-muted-foreground mb-1">You'll need:</div>
                    <div className="flex flex-wrap gap-1">
                      {fullActivity.materials.slice(0, 3).map((material, idx) => (
                        <span 
                          key={idx}
                          className="text-xs bg-muted px-2 py-1 rounded-md"
                        >
                          {material}
                        </span>
                      ))}
                      {fullActivity.materials.length > 3 && (
                        <span className="text-xs text-muted-foreground">
                          +{fullActivity.materials.length - 3} more
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

      <Button 
        variant="outline" 
        className="w-full"
        onClick={() => onViewDetails('all')}
      >
        View All Activities ({activities.length})
      </Button>
    </div>
  );
}