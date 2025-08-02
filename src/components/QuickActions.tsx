import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Camera, TrendingUp, Baby, Calendar } from "lucide-react";

interface QuickActionsProps {
  onAction: (action: string) => void;
}

export function QuickActions({ onAction }: QuickActionsProps) {
  const actions = [
    {
      id: "capture",
      icon: Camera,
      label: "Capture",
      color: "bg-gradient-accent",
      textColor: "text-accent-foreground"
    },
    {
      id: "milestone",
      icon: Baby,
      label: "Milestone",
      color: "bg-gradient-primary",
      textColor: "text-primary-foreground"
    },
    {
      id: "growth",
      icon: TrendingUp,
      label: "Growth",
      color: "bg-gradient-secondary",
      textColor: "text-secondary-foreground"
    },
    {
      id: "schedule",
      icon: Calendar,
      label: "Schedule",
      color: "bg-gradient-warm",
      textColor: "text-warm-foreground"
    }
  ];

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action) => (
        <Button
          key={action.id}
          variant="ghost"
          className={`h-20 flex-col gap-2 ${action.color} ${action.textColor} rounded-2xl border-0 hover:scale-105 transition-transform`}
          onClick={() => onAction(action.id)}
        >
          <action.icon className="h-6 w-6" />
          <span className="text-xs font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}