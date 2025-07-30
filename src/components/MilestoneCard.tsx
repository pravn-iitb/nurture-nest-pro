import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Circle, AlertCircle, Info } from "lucide-react";

interface Milestone {
  id: string;
  title: string;
  description: string;
  ageRange: string;
  completed: boolean;
  overdue: boolean;
}

interface MilestoneCardProps {
  milestone: Milestone;
  onToggle: (id: string) => void;
  onGetAdvice: (id: string) => void;
}

export function MilestoneCard({ milestone, onToggle, onGetAdvice }: MilestoneCardProps) {
  const getStatusIcon = () => {
    if (milestone.completed) {
      return <CheckCircle className="h-6 w-6 text-success" />;
    }
    if (milestone.overdue) {
      return <AlertCircle className="h-6 w-6 text-warning" />;
    }
    return <Circle className="h-6 w-6 text-muted-foreground" />;
  };

  const getCardVariant = () => {
    if (milestone.completed) return "border-success/20 bg-success/5";
    if (milestone.overdue) return "border-warning/20 bg-warning/5";
    return "border-border";
  };

  return (
    <Card className={`p-4 transition-all duration-300 ${getCardVariant()}`}>
      <div className="flex items-start gap-3">
        <button
          onClick={() => onToggle(milestone.id)}
          className="mt-1 transition-transform hover:scale-110"
        >
          {getStatusIcon()}
        </button>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-foreground mb-1">
            {milestone.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-2">
            {milestone.description}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs bg-muted px-2 py-1 rounded-lg">
              {milestone.ageRange}
            </span>
            
            {(milestone.overdue || !milestone.completed) && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onGetAdvice(milestone.id)}
                className="text-primary hover:text-primary-foreground hover:bg-primary"
              >
                <Info className="h-4 w-4 mr-1" />
                {milestone.overdue ? "Get Help" : "Tips"}
              </Button>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}