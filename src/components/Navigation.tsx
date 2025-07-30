import { Button } from "@/components/ui/button";
import { Home, TrendingUp, Lightbulb, Gamepad2, Users } from "lucide-react";

interface NavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function Navigation({ activeTab, onTabChange }: NavigationProps) {
  const tabs = [
    { id: "dashboard", icon: Home, label: "Home" },
    { id: "milestones", icon: TrendingUp, label: "Growth" },
    { id: "tips", icon: Lightbulb, label: "Tips" },
    { id: "activities", icon: Gamepad2, label: "Play" },
    { id: "family", icon: Users, label: "Family" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-50">
      <div className="flex items-center justify-around px-4 py-2 max-w-md mx-auto">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          
          return (
            <Button
              key={tab.id}
              variant="ghost"
              size="sm"
              onClick={() => onTabChange(tab.id)}
              className={`flex flex-col items-center gap-1 h-auto p-2 ${
                isActive 
                  ? 'text-primary bg-primary/10' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className={`h-5 w-5 ${isActive ? 'animate-pulse-glow' : ''}`} />
              <span className="text-xs font-medium">
                {tab.label}
              </span>
            </Button>
          );
        })}
      </div>
    </nav>
  );
}