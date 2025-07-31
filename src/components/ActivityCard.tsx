import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Users, Zap } from "lucide-react";

interface Activity {
  id: string;
  title: string;
  description: string;
  duration: string;
  ageGroup: string;
  participants: number;
  category: "physical" | "cognitive" | "social" | "creative" | "sensory";
  difficulty: "easy" | "medium" | "hard";
}

interface ActivityCardProps {
  activity: Activity;
  onStartActivity: (id: string) => void;
}

export function ActivityCard({ activity, onStartActivity }: ActivityCardProps) {
  const getCategoryColor = () => {
    switch (activity.category) {
      case "physical": return "bg-gradient-primary";
      case "cognitive": return "bg-gradient-accent";
      case "social": return "bg-gradient-secondary";
      case "creative": return "bg-warning";
      default: return "bg-gradient-primary";
    }
  };

  const getDifficultyBadge = () => {
    switch (activity.difficulty) {
      case "easy": return "bg-success/10 text-success border border-success/20";
      case "medium": return "bg-warning/10 text-warning border border-warning/20";
      case "hard": return "bg-destructive/10 text-destructive border border-destructive/20";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="p-4 hover:shadow-medium transition-all duration-300 hover:scale-105">
      <div className="space-y-3">
        <div className="flex items-start justify-between">
          <div className={`w-10 h-10 ${getCategoryColor()} rounded-xl flex items-center justify-center`}>
            <Zap className="h-5 w-5 text-white" />
          </div>
          <span className={`text-xs px-2 py-1 rounded-lg ${getDifficultyBadge()}`}>
            {activity.difficulty}
          </span>
        </div>
        
        <div>
          <h3 className="font-semibold text-foreground mb-1">
            {activity.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-3">
            {activity.description}
          </p>
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            {activity.duration}
          </div>
          <div className="flex items-center gap-1">
            <Users className="h-3 w-3" />
            {activity.participants} {activity.participants === 1 ? "person" : "people"}
          </div>
          <span className="bg-muted px-2 py-1 rounded">
            {activity.ageGroup}
          </span>
        </div>
        
        <Button 
          onClick={() => onStartActivity(activity.id)}
          className="w-full"
          variant="outline"
        >
          Start Activity
        </Button>
      </div>
    </Card>
  );
}