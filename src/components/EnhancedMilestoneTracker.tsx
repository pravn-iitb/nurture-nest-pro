import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, AlertTriangle, Users, Lightbulb, ArrowRight, Info } from "lucide-react";
import { getMilestonesForAge, getOverdueMilestones, type EnhancedMilestone } from "@/data/enhancedMilestones";
import { useState } from "react";

interface EnhancedMilestoneTrackerProps {
  ageInMonths: number;
  completedMilestones: string[];
  onToggleMilestone: (id: string) => void;
  onGetHelp: (id: string) => void;
}

export function EnhancedMilestoneTracker({ 
  ageInMonths, 
  completedMilestones, 
  onToggleMilestone, 
  onGetHelp 
}: EnhancedMilestoneTrackerProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const currentMilestones = getMilestonesForAge(ageInMonths);
  const overdueMilestones = getOverdueMilestones(ageInMonths);
  
  const categories = [
    { id: 'all', label: 'All', icon: '🌟' },
    { id: 'physical', label: 'Physical', icon: '🏃' },
    { id: 'cognitive', label: 'Cognitive', icon: '🧠' },
    { id: 'language', label: 'Language', icon: '💬' },
    { id: 'social', label: 'Social', icon: '👥' },
    { id: 'emotional', label: 'Emotional', icon: '❤️' },
    { id: 'behavioral', label: 'Behavioral', icon: '✨' }
  ];

  const filteredMilestones = selectedCategory === 'all' 
    ? currentMilestones 
    : currentMilestones.filter(m => m.category === selectedCategory);

  const formatAgeRange = (ageRange: [number, number]) => {
    const [min, max] = ageRange;
    if (max < 12) return `${min}-${max}m`;
    return `${Math.floor(min/12)}-${Math.floor(max/12)}y`;
  };

  const getUrgencyLevel = (milestone: EnhancedMilestone, isCompleted: boolean) => {
    if (isCompleted) return 'completed';
    if (overdueMilestones.some(m => m.id === milestone.id)) return 'overdue';
    if (milestone.importance === 'critical') return 'critical';
    if (milestone.importance === 'high') return 'high';
    return 'normal';
  };

  const getStatusIcon = (milestone: EnhancedMilestone, isCompleted: boolean) => {
    if (isCompleted) {
      return <CheckCircle2 className="h-5 w-5 text-success" />;
    }
    const urgency = getUrgencyLevel(milestone, isCompleted);
    if (urgency === 'overdue' || urgency === 'critical') {
      return <AlertTriangle className="h-5 w-5 text-warning" />;
    }
    return <Circle className="h-5 w-5 text-muted-foreground" />;
  };

  const getCardStyling = (milestone: EnhancedMilestone, isCompleted: boolean) => {
    const urgency = getUrgencyLevel(milestone, isCompleted);
    
    switch (urgency) {
      case 'completed':
        return 'border-success/30 bg-success/5';
      case 'overdue':
      case 'critical':
        return 'border-warning/30 bg-warning/5';
      case 'high':
        return 'border-primary/30 bg-primary/5';
      default:
        return 'border-border bg-card';
    }
  };

  const getImportanceBadgeColor = (importance: EnhancedMilestone['importance']) => {
    switch (importance) {
      case 'critical': return 'bg-red-100 text-red-700 border-red-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'medium': return 'bg-blue-100 text-blue-700 border-blue-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  if (currentMilestones.length === 0) {
    return (
      <Card className="p-6 text-center">
        <div className="space-y-3">
          <div className="text-4xl">🎉</div>
          <h3 className="font-semibold">All Set for Now!</h3>
          <p className="text-sm text-muted-foreground">
            No new milestones expected at this age. Keep nurturing development!
          </p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Category Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(category.id)}
            className="flex items-center gap-1 whitespace-nowrap text-xs"
          >
            <span>{category.icon}</span>
            {category.label}
          </Button>
        ))}
      </div>

      {/* Overdue Alert */}
      {overdueMilestones.length > 0 && (
        <Card className="border-warning/30 bg-warning/5 p-4">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-sm font-medium text-warning">
              {overdueMilestones.length} Milestone{overdueMilestones.length > 1 ? 's' : ''} Need Attention
            </span>
          </div>
          <p className="text-xs text-muted-foreground mb-3">
            Consider discussing with your pediatrician during your next visit.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Users className="h-3 w-3" />
            <span>You're not alone - reach out to other parents in similar situations</span>
          </div>
        </Card>
      )}

      {/* Milestones */}
      <div className="space-y-3">
        {filteredMilestones.map((milestone) => {
          const isCompleted = completedMilestones.includes(milestone.id);
          
          return (
            <Card 
              key={milestone.id} 
              className={`transition-all duration-300 hover:shadow-soft ${getCardStyling(milestone, isCompleted)}`}
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <button
                    onClick={() => onToggleMilestone(milestone.id)}
                    className="mt-1 transition-transform hover:scale-110"
                  >
                    {getStatusIcon(milestone, isCompleted)}
                  </button>
                  
                  <div className="flex-1 min-w-0 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className={`font-semibold text-sm leading-tight ${isCompleted ? 'line-through text-muted-foreground' : ''}`}>
                        {milestone.title}
                      </h3>
                      <div className="flex items-center gap-1">
                        <Badge variant="outline" className="text-xs">
                          {formatAgeRange(milestone.ageRangeMonths)}
                        </Badge>
                        <Badge className={`text-xs ${getImportanceBadgeColor(milestone.importance)}`}>
                          {milestone.importance}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {milestone.description}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-xs text-muted-foreground">
                        {milestone.subcategory} • {milestone.source}
                      </div>
                      
                      {!isCompleted && (
                        <div className="flex items-center gap-1">
                          {milestone.socialSupport && (
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mr-2">
                              <Users className="h-3 w-3" />
                              <span>{milestone.socialSupport.parentsReportRate}% of parents</span>
                            </div>
                          )}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onGetHelp(milestone.id)}
                            className="text-primary hover:text-primary-foreground hover:bg-primary h-6 px-2 text-xs"
                          >
                            <Lightbulb className="h-3 w-3 mr-1" />
                            Tips
                          </Button>
                        </div>
                      )}
                    </div>

                    {/* Social Support Info (for overdue milestones) */}
                    {!isCompleted && milestone.socialSupport && overdueMilestones.some(m => m.id === milestone.id) && (
                      <div className="mt-2 p-2 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-1 text-xs font-medium text-blue-700 mb-1">
                          <Users className="h-3 w-3" />
                          Community Support
                        </div>
                        <p className="text-xs text-blue-600 mb-1">
                          {milestone.socialSupport.commonChallenges[0]}
                        </p>
                        <p className="text-xs text-blue-600">
                          💡 {milestone.socialSupport.supportTips[0]}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredMilestones.length === 0 && selectedCategory !== 'all' && (
        <Card className="p-6 text-center">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">
              No {selectedCategory} milestones for this age
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSelectedCategory('all')}
              className="text-primary"
            >
              View all milestones
              <ArrowRight className="h-3 w-3 ml-1" />
            </Button>
          </div>
        </Card>
      )}
    </div>
  );
}