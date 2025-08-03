import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, AlertTriangle, Calendar, Info } from "lucide-react";
import { officialMilestones, getMilestonesForAge, getOverdueMilestones } from "@/data/milestones";

interface MilestoneTrackerProps {
  ageInMonths: number;
  completedMilestones: string[];
  onToggleMilestone: (id: string) => void;
  onGetHelp: (id: string) => void;
}

export function MilestoneTracker({ 
  ageInMonths, 
  completedMilestones, 
  onToggleMilestone, 
  onGetHelp 
}: MilestoneTrackerProps) {
  const currentMilestones = getMilestonesForAge(ageInMonths);
  const overdueMilestones = getOverdueMilestones(ageInMonths);
  
  const formatAgeRange = (ageRange: [number, number]) => {
    const [min, max] = ageRange;
    if (max < 12) return `${min}-${max} months`;
    return `${Math.floor(min/12)}-${Math.floor(max/12)} years`;
  };

  const getUrgencyLevel = (milestone: any, isCompleted: boolean) => {
    if (isCompleted) return 'completed';
    if (overdueMilestones.some(m => m.id === milestone.id)) return 'overdue';
    if (milestone.importance === 'high') return 'high';
    return 'normal';
  };

  const getStatusIcon = (milestone: any, isCompleted: boolean) => {
    const urgency = getUrgencyLevel(milestone, isCompleted);
    
    if (isCompleted) {
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    }
    if (urgency === 'overdue') {
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    }
    return <Circle className="h-5 w-5 text-muted-foreground" />;
  };

  const getCardStyling = (milestone: any, isCompleted: boolean) => {
    const urgency = getUrgencyLevel(milestone, isCompleted);
    
    switch (urgency) {
      case 'completed':
        return 'border-success/20 bg-success/5';
      case 'overdue':
        return 'border-warning/20 bg-warning/5';
      case 'high':
        return 'border-primary/20 bg-primary/5';
      default:
        return 'border-border';
    }
  };

  if (currentMilestones.length === 0) {
    return (
      <Card className="p-6 text-center">
        <Calendar className="h-12 w-12 mx-auto mb-3 text-muted-foreground" />
        <h3 className="font-semibold mb-1">All Set!</h3>
        <p className="text-sm text-muted-foreground">
          No new milestones expected at this age. Keep monitoring development!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {overdueMilestones.length > 0 && (
        <Card className="border-warning/20 bg-warning/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium text-warning">
              {overdueMilestones.length} Milestone{overdueMilestones.length > 1 ? 's' : ''} Need Attention
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Consider consulting your pediatrician if you have concerns.
          </p>
        </Card>
      )}

      {currentMilestones.map((milestone) => {
        const isCompleted = completedMilestones.includes(milestone.id);
        
        return (
          <Card 
            key={milestone.id} 
            className={`p-4 transition-all duration-300 hover-scale ${getCardStyling(milestone, isCompleted)}`}
          >
            <div className="flex items-start gap-3">
              <button
                onClick={() => onToggleMilestone(milestone.id)}
                className="mt-1 transition-transform hover:scale-110"
              >
                {getStatusIcon(milestone, isCompleted)}
              </button>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`font-semibold text-sm ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                    {milestone.title}
                  </h3>
                  <Badge variant="outline" className="text-xs">
                    {formatAgeRange(milestone.ageRangeMonths)}
                  </Badge>
                  {milestone.importance === 'high' && (
                    <Badge variant="secondary" className="text-xs bg-primary/10 text-primary">
                      Key
                    </Badge>
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-3 leading-relaxed">
                  {milestone.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="text-xs text-muted-foreground">
                    Source: {milestone.source}
                  </div>
                  
                  {!isCompleted && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onGetHelp(milestone.id)}
                      className="text-primary hover:text-primary-foreground hover:bg-primary h-7 px-2"
                    >
                      <Info className="h-3 w-3 mr-1" />
                      Tips
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
}